<?php

declare(strict_types=1);

/**
 * iVantage inquiry mailer.
 *
 * Accepts validated inquiry JSON posted by the website's contact form and
 * delivers it to the company inbox over SMTP with PHPMailer.
 *
 * Deployment:
 *   1. copy this folder to your PHP host (a folder outside the web root is best)
 *   2. cp config.example.php config.php and fill in the SMTP details
 *   3. composer install   (or drop a PHPMailer release into ./PHPMailer)
 *   4. list the site's origins in config.php's allowed_origins, and point the
 *      site's VITE_INQUIRY_MAIL_ENDPOINT at this script's URL
 *
 * The form is submitted by the browser, so nothing secret can live in the site.
 * Abuse is limited by the origin allowlist, the per-IP rate limit, the
 * honeypot field and the server-side re-validation below.
 */

use PHPMailer\PHPMailer\PHPMailer;

const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_WINDOW_SECONDS = 600;
const PROJECT_TYPES = [
    'Web application',
    'Mobile application',
    'Enterprise software',
    'UI/UX and product engineering',
    'Other',
];

/**
 * The site's origin, remembered once it passes the allowlist so every later
 * response carries the header the browser needs to read it.
 */
function cors_origin(?string $origin = null): string
{
    static $matched = '';
    if ($origin !== null) {
        $matched = $origin;
    }

    return $matched;
}

/** Let an accepted origin read the response; the header is what unblocks the browser. */
function allow_cors(): void
{
    $origin = cors_origin();
    if ($origin === '') {
        return;
    }
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}

/** @param array<string, mixed> $payload */
function respond(int $status, array $payload): never
{
    http_response_code($status);
    allow_cors();
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * The browser sends Origin on every POST, same-origin included. A request with
 * no Origin is not a form submission, so it is rejected rather than trusted.
 */
function request_origin(): string
{
    $origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
    if ($origin === '' && !empty($_SERVER['HTTP_REFERER'])) {
        $parts = parse_url((string) $_SERVER['HTTP_REFERER']);
        if (is_array($parts) && isset($parts['scheme'], $parts['host'])) {
            $origin = $parts['scheme'] . '://' . $parts['host'];
            if (isset($parts['port'])) {
                $origin .= ':' . $parts['port'];
            }
        }
    }

    return rtrim($origin, '/');
}

/** @param array<string, mixed> $payload */
function text(array $payload, string $key, int $min, int $max): ?string
{
    $value = $payload[$key] ?? null;
    if (!is_string($value)) {
        return null;
    }
    $value = trim($value);
    $length = mb_strlen($value);

    return $length >= $min && $length <= $max ? $value : null;
}

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    error_log('[ivantage-mail] config.php is missing');
    respond(500, ['ok' => false, 'error' => 'Mailer is not configured.']);
}

/** @var array<string, mixed> $config */
$config = require $configFile;

$allowed = [];
foreach (is_array($config['allowed_origins'] ?? null) ? $config['allowed_origins'] : [] as $entry) {
    if (is_string($entry) && $entry !== '') {
        $allowed[] = rtrim($entry, '/');
    }
}
if ($allowed === []) {
    error_log('[ivantage-mail] allowed_origins is empty');
    respond(500, ['ok' => false, 'error' => 'Mailer is not configured.']);
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$origin = request_origin();

if (!in_array($origin, $allowed, true)) {
    if ($method === 'OPTIONS') {
        // No allow headers, so the browser blocks the follow-up POST.
        http_response_code(204);
        exit;
    }
    respond(403, ['ok' => false, 'error' => 'Origin not allowed.']);
}
cors_origin($origin);

if ($method === 'OPTIONS') {
    allow_cors();
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 600');
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// The endpoint is public, so throttle per caller before doing any work.
$bucketDirectory = sys_get_temp_dir() . '/ivantage-mail';
if (!is_dir($bucketDirectory)) {
    @mkdir($bucketDirectory, 0700, true);
}
$bucketFile = $bucketDirectory . '/' . hash('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
$now = time();
$recent = [];
if (is_file($bucketFile)) {
    $decoded = json_decode((string) file_get_contents($bucketFile), true);
    foreach (is_array($decoded) ? $decoded : [] as $hit) {
        if (is_int($hit) && $hit > $now - RATE_WINDOW_SECONDS) {
            $recent[] = $hit;
        }
    }
}
if (count($recent) >= MAX_REQUESTS_PER_WINDOW) {
    respond(429, ['ok' => false, 'error' => 'Too many requests. Please try again later.']);
}
$recent[] = $now;
@file_put_contents($bucketFile, json_encode($recent), LOCK_EX);

$raw = (string) file_get_contents('php://input', false, null, 0, 16384);
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request body.']);
}

if (trim((string) ($payload['website'] ?? '')) !== '') {
    respond(200, ['ok' => true]);
}

$name = text($payload, 'full_name', 2, 100);
$email = text($payload, 'work_email', 3, 254);
$company = text($payload, 'company', 1, 150);
$projectType = text($payload, 'project_type', 1, 60);
$description = text($payload, 'description', 20, 5000);

if (
    $name === null
    || $email === null
    || $company === null
    || $projectType === null
    || $description === null
    || filter_var($email, FILTER_VALIDATE_EMAIL) === false
    || !in_array($projectType, PROJECT_TYPES, true)
) {
    respond(422, ['ok' => false, 'error' => 'Please check the submitted details.']);
}

$autoload = __DIR__ . '/vendor/autoload.php';
if (is_file($autoload)) {
    require $autoload;
} else {
    $sources = __DIR__ . '/PHPMailer/src/';
    require $sources . 'Exception.php';
    require $sources . 'PHPMailer.php';
    require $sources . 'SMTP.php';
}

$smtp = is_array($config['smtp'] ?? null) ? $config['smtp'] : [];
$host = (string) ($smtp['host'] ?? '');
$username = (string) ($smtp['username'] ?? '');
$password = (string) ($smtp['password'] ?? '');
$fromEmail = (string) ($config['from_email'] ?? '');
$toEmail = (string) ($config['to_email'] ?? '');

if (
    $host === ''
    || $username === ''
    || $password === ''
    || filter_var($fromEmail, FILTER_VALIDATE_EMAIL) === false
    || filter_var($toEmail, FILTER_VALIDATE_EMAIL) === false
) {
    error_log('[ivantage-mail] SMTP settings are incomplete');
    respond(500, ['ok' => false, 'error' => 'Mailer is not configured.']);
}

$body = implode("\n", [
    'New project inquiry from the iVantage website.',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Company: ' . $company,
    'Project type: ' . $projectType,
    '',
    $description,
    '',
    'Submitted: ' . gmdate('Y-m-d H:i:s') . ' UTC',
]);

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $host;
    $mail->Port = (int) ($smtp['port'] ?? 587);
    $mail->SMTPAuth = true;
    $mail->Username = $username;
    $mail->Password = $password;
    $mail->Timeout = 15;

    $encryption = strtolower((string) ($smtp['encryption'] ?? 'tls'));
    if ($encryption === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($encryption === 'none') {
        $mail->SMTPSecure = '';
        $mail->SMTPAutoTLS = false;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }

    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->setFrom($fromEmail, (string) ($config['from_name'] ?? 'iVantage Website'));
    $mail->addAddress($toEmail);
    $mail->addReplyTo($email, $name);
    $mail->Subject = 'New project inquiry - ' . str_replace(["\r", "\n"], ' ', $company);
    $mail->isHTML(false);
    $mail->Body = $body;
    $mail->send();
} catch (Throwable $error) {
    error_log('[ivantage-mail] send failed: ' . $error->getMessage());
    respond(502, ['ok' => false, 'error' => 'Email delivery failed.']);
}

respond(200, ['ok' => true]);
