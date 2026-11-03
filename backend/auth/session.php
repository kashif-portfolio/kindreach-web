<?php
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    auth_error(405, 'Only GET allowed');
}

// React checks this API instead of trusting a role saved in localStorage.
$user = require_login();
echo json_encode(['status' => 'success', 'data' => $user]);
