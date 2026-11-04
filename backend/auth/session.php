<?php

// Current login ki details
require_once "../db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
  auth_error(405, "Only GET allowed");
}

// React login ko PHP session se verify karti hai.
$user = require_login();
echo json_encode(["status" => "success", "data" => $user]);
