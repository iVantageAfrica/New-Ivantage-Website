<?php

declare(strict_types=1);

/**
 * Copy this file to config.php in the same folder and fill in real values.
 * config.php is git-ignored, so SMTP credentials never land in the repository.
 */
return [
    // Every origin the site is served from, scheme + host (+ port) only, no path.
    // Requests from anywhere else are rejected. Add your local dev server while
    // testing and remove it before you go live.
    'allowed_origins' => [
        'https://ivantage.africa',
        'http://localhost:8080',
    ],

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
