<?php
/**
 * Database & App Configuration for Korpora Web Atelier
 * Compatible with cPanel (Apache/LiteSpeed + PHP 8.x + MySQL)
 * Supports auto-fallback to SQLite when MySQL is not yet configured.
 */

// Load .env if present in root or api directory
$envFile = dirname(__DIR__) . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($key, $val) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($val, " \t\n\r\0\x0B\"'");
        }
    }
}

return [
    // Preferred database type: 'mysql' or 'sqlite'
    'db_type' => $_ENV['DB_TYPE'] ?? 'mysql',

    // MySQL connection settings for cPanel
    'mysql' => [
        'host' => $_ENV['DB_HOST'] ?? 'localhost',
        'port' => $_ENV['DB_PORT'] ?? '3306',
        'dbname' => $_ENV['DB_NAME'] ?? 'korpora_db',
        'user' => $_ENV['DB_USER'] ?? 'root',
        'pass' => $_ENV['DB_PASS'] ?? '',
        'charset' => 'utf8mb4',
    ],

    // SQLite auto-fallback path
    'sqlite' => [
        'path' => __DIR__ . '/data/korpora.sqlite',
    ],

    // Security & CORS
    'cors' => [
        'allowed_origins' => ['*'],
        'allowed_methods' => ['GET', 'POST', 'OPTIONS'],
        'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    ],
];
