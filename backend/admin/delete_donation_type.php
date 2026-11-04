<?php

// Bina linked donations wali category delete karo.
require_once "../db_connect.php";

$currentUser = require_login(["Admin"]);

// Frontend se aaya data
$data = json_decode(file_get_contents("php://input"), true);
$typeID = isset($data["typeID"]) ? (int) $data["typeID"] : 0;

if (!$typeID) {
  http_response_code(400);
  echo json_encode(["status" => "error", "message" => "typeID required"]);
  exit();
}

// Database ka kaam
try {
  $pdo->beginTransaction();
  $check = $pdo->prepare("SELECT TypeID FROM donation_type WHERE TypeID = ? FOR UPDATE");
  $check->execute([$typeID]);
  if (!$check->fetch()) {
    $pdo->rollBack();
    auth_error(404, "Category not found");
  }
  $check = $pdo->prepare("SELECT DonationID FROM donation WHERE TypeID = ? LIMIT 1");
  $check->execute([$typeID]);
  if ($check->fetch()) {
    $pdo->rollBack();
    auth_error(409, "Category has donations and cannot be deleted. Edit its details instead");
  }

  $stmt = $pdo->prepare("DELETE FROM donation_type WHERE TypeID = ?");
  $stmt->execute([$typeID]);
  $pdo->commit();
  echo json_encode(["status" => "success", "message" => "Type deleted"]);
} catch (PDOException $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => "Cannot delete (in use?): " . $e->getMessage(),
  ]);
}
