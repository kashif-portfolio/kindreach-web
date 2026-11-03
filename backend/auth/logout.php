<?php
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    auth_error(405, 'Only POST allowed');
}

// Clear both the server session and the browser's session cookie.
$_SESSION = [];
session_destroy();
setcookie(session_name(), '', [
    'expires' => time() - 3600,
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
]);
echo json_encode(['status' => 'success', 'message' => 'Logged out successfully']);
