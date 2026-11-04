<?php

// Complaint ka jawab save karo.
require_once "../db_connect.php";

$currentUser = require_login(["Admin"]);

// Frontend se aaya data
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data["complaintID"])) {
  http_response_code(400);
  echo json_encode(["status" => "error", "message" => "complaintID required"]);
  exit();
}

$note = isset($data["adminNote"]) ? trim($data["adminNote"]) : "";

// Database ka kaam
try {
  $stmt = $pdo->prepare("
        UPDATE complaint
        SET Status = 'Resolved',
            AdminNote = ?,
            ResolvedAt = NOW()
        WHERE ComplaintID = ? AND Status = 'Open'
    ");
  $stmt->execute([$note, (int) $data["complaintID"]]);

  if ($stmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(["status" => "error", "message" => "Complaint not found or already resolved"]);
    exit();
  }

  echo json_encode(["status" => "success", "message" => "Complaint resolved"]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
