<?php

// Admin donation request approve ya reject kare.
require_once "../db_connect.php";
require_once "../donation_workflow.php";
$currentUser = require_login(["Admin"]);
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  auth_error(405, "Only POST allowed");
}

// Frontend se aaya data
$data = json_decode(file_get_contents("php://input"), true);
$requestID = (int) ($data["requestID"] ?? 0);
$status = $data["status"] ?? "";
if ($requestID < 1 || !in_array($status, ["Accepted", "Approved", "Rejected"], true)) {
  auth_error(400, "Valid requestID and Accepted or Rejected status required");
}

// Database ka kaam
try {
  $pdo->beginTransaction();
  if ($status === "Rejected") {
    lock_donation(request_donation_id($requestID));
    $stmt = $pdo->prepare(
      "UPDATE donation_request SET Status = 'Rejected', RespondedAt = NOW() WHERE RequestID = ? AND Status = 'Pending'",
    );
    $stmt->execute([$requestID]);
    if (!$stmt->rowCount()) {
      workflow_error(409, "Only pending requests can be rejected");
    }
  } else {
    approve_donation_request($requestID);
  }
  $pdo->commit();
  echo json_encode(["status" => "success", "message" => "Request updated"]);
} catch (PDOException $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  auth_error(500, "Could not save changes. Please try again");
}
