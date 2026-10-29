<?php

declare(strict_types=1);

/**
 * Copy this file to config.php in the same folder and fill in real values.
 * config.php is git-ignored, so SMTP credentials never land in the repository.
 */
return [
    // Shared secret sent by the website in the X-Inquiry-Secret header.
    // Generate one with: openssl rand -hex 32
    // Then use the same value for INQUIRY_MAIL_SECRET in the site's .env
    'secret' => 'CHANGE_ME_run_openssl_rand_hex_32',

    // Where inquiries land, and the mailbox they are sent from.
    'to_email' => 'support@ivantage.africa',
    'from_email' => 'website@ivantage.africa',
    'from_name' => 'iVantage Website',

    'smtp' => [
        'host' => 'smtp.your-provider.com',
        'port' => 587,
        'username' => 'website@ivantage.africa',
        'password' => 'YOUR_SMTP_PASSWORD',
        // 'tls' for port 587, 'ssl' for port 465, 'none' only for local relays.
        'encryption' => 'tls',
    ],
];
