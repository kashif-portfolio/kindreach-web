<?php

// Donor ki basic details save karo.
require_once "../db_connect.php";
$user = require_login(["Admin"]);
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  auth_error(405, "Only POST allowed");
}

// Frontend se aaya data
$data = json_decode(file_get_contents("php://input"), true);
$id = (int) ($data["userID"] ?? 0);
$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$phone = trim($data["phone"] ?? "");
$address = trim($data["address"] ?? "");
if ($id < 1 || !$name || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$phone || !$address) {
  auth_error(400, "Valid name, email, phone and location required");
}

// Database ka kaam
try {
  $pdo->beginTransaction();
  $stmt = $pdo->prepare("SELECT DonorID FROM donor WHERE UserID = ? FOR UPDATE");
  $stmt->execute([$id]);
  if (!$stmt->fetch()) {
    $pdo->rollBack();
    auth_error(404, "Donor not found");
  }
  $stmt = $pdo->prepare(
    "UPDATE user SET Name = ?, Email = ?, Phone = ?, Address = ? WHERE UserID = ?",
  );
  $stmt->execute([$name, $email, $phone, $address, $id]);
  $pdo->commit();
  echo json_encode(["status" => "success"]);
} catch (PDOException $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  auth_error(500, "Could not save changes. Check for duplicate email or linked records");
}
