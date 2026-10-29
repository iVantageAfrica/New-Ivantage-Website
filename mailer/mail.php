<?php

declare(strict_types=1);

/**
 * iVantage inquiry mailer.
 *
 * Accepts validated inquiry JSON from the site's server function and delivers
 * it to the company inbox over SMTP with PHPMailer.
 *
 * Deployment:
 *   1. copy this folder to your PHP host (a folder outside the web root is best)
 *   2. cp config.example.php config.php and fill in the SMTP details
 *   3. composer install   (or drop a PHPMailer release into ./PHPMailer)
 *   4. set INQUIRY_MAIL_ENDPOINT to https://your-host/mailer/mail.php and
 *      INQUIRY_MAIL_SECRET to the same value as config.php's secret
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

/** @param array<string, mixed> $payload */
function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
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

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$secret = (string) ($config['secret'] ?? '');
$provided = (string) ($_SERVER['HTTP_X_INQUIRY_SECRET'] ?? '');
if ($secret === '' || $provided === '' || !hash_equals($secret, $provided)) {
    respond(401, ['ok' => false, 'error' => 'Unauthorized.']);
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
