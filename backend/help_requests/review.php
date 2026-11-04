<?php

// Admin ka help request par faisla
require_once "../db_connect.php";
require_once "../donation_workflow.php";
$user = require_login(["Admin"]);
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  auth_error(405, "Only POST allowed");
}

// Frontend se aaya data
$data = json_decode(file_get_contents("php://input"), true);
$id = (int) ($data["helpRequestID"] ?? 0);
$status = $data["status"] ?? "";
if (!$id || !in_array($status, ["Approved", "Rejected"], true)) {
  auth_error(400, "Valid request ID and decision required");
}

// Database ka kaam
try {
  $pdo->beginTransaction();
  $stmt = $pdo->prepare("SELECT * FROM help_request WHERE HelpRequestID = ? FOR UPDATE");
  $stmt->execute([$id]);
  $request = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$request) {
    workflow_error(404, "Help request not found");
  }
  if ($request["Status"] !== "Pending" || $request["DonationRequestID"]) {
    workflow_error(409, "Only pending help requests can be reviewed");
  }
  if ($status === "Approved") {
    verified_recipient($request["NeedyID"]);
  }
  $stmt = $pdo->prepare("UPDATE help_request SET Status = ? WHERE HelpRequestID = ?");
  $stmt->execute([$status, $id]);
  $pdo->commit();
  echo json_encode(["status" => "success", "message" => "Help request reviewed"]);
} catch (PDOException $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  auth_error(500, "Could not review request");
}
