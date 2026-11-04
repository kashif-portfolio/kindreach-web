<?php

// Needy profile aur account delete karo.
// Needy profile aur uska account delete karo.

require_once "../db_connect.php";

$currentUser = require_login(["Admin"]);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["status" => "error", "message" => "Only POST method is allowed"]);
  exit();
}

// Frontend se aaya data
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["needyID"])) {
  http_response_code(400);
  echo json_encode(["status" => "error", "message" => "needyID is required"]);
  exit();
}

$needyID = (int) $data["needyID"];

// Database ka kaam
try {
  $pdo->beginTransaction();

  // Pehle user ID lao.
  $stmt = $pdo->prepare("SELECT UserID FROM needy_person WHERE NeedyID = ?");
  $stmt->execute([$needyID]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$row) {
    $pdo->rollBack();
    http_response_code(404);
    echo json_encode(["status" => "error", "message" => "Needy person not found"]);
    exit();
  }

  $userID = $row["UserID"];

  // Is needy ki linked requests delete karo.
  $stmt = $pdo->prepare("DELETE FROM donation_request WHERE NeedyID = ?");
  $stmt->execute([$needyID]);

  // Needy ki profile delete karo.
  $stmt = $pdo->prepare("DELETE FROM needy_person WHERE NeedyID = ?");
  $stmt->execute([$needyID]);

  // User ka account delete karo.
  $stmt = $pdo->prepare("DELETE FROM user WHERE UserID = ?");
  $stmt->execute([$userID]);

  $pdo->commit();

  http_response_code(200);
  echo json_encode([
    "status" => "success",
    "message" => "Needy person deleted successfully",
  ]);
} catch (PDOException $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}
