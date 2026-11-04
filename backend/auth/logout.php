<?php

// Login session khatam karo.
require_once "../db_connect.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  auth_error(405, "Only POST allowed");
}

// PHP session aur browser ki session cookie dono hatao.
$_SESSION = [];
session_destroy();
setcookie(session_name(), "", [
  "expires" => time() - 3600,
  "path" => "/",
  "httponly" => true,
  "samesite" => "Lax",
  "secure" => !empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off",
]);
echo json_encode(["status" => "success", "message" => "Logged out successfully"]);
