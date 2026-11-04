<?php

// Donation aur request Delivered karo.
require_once "../db_connect.php";
require_once "../donation_workflow.php";
$currentUser = require_login(["Donor"]);
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  auth_error(405, "Only POST allowed");
}

// Frontend se aaya data
$data = json_decode(file_get_contents("php://input"), true);
$scheduleID = (int) ($data["scheduleID"] ?? 0);
if ($scheduleID < 1) {
  auth_error(400, "scheduleID required");
}

// Database ka kaam
try {
  $pdo->beginTransaction();
  $stmt = $pdo->prepare("SELECT RequestID FROM delivery_schedule WHERE ScheduleID = ?");
  $stmt->execute([$scheduleID]);
  $schedule = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$schedule) {
    workflow_error(404, "Schedule not found");
  }
  $requestID = $schedule["RequestID"];
  $donationID = request_donation_id($requestID);
  $donation = lock_donation($donationID, $currentUser["donorID"]);
  $stmt = $pdo->prepare("SELECT * FROM delivery_schedule WHERE ScheduleID = ? FOR UPDATE");
  $stmt->execute([$scheduleID]);
  $schedule = $stmt->fetch(PDO::FETCH_ASSOC);
  if ((int) $schedule["DonorID"] !== (int) $currentUser["donorID"]) {
    workflow_error(403, "This schedule does not belong to you");
  }
  if ($schedule["Status"] !== "Scheduled") {
    workflow_error(409, "Delivery already completed or unavailable");
  }
  if (!in_array($donation["Status"], ["Approved", "Assigned"], true)) {
    workflow_error(409, "Donation is not allocated for delivery");
  }
  $stmt = $pdo->prepare("SELECT * FROM donation_request WHERE RequestID = ? FOR UPDATE");
  $stmt->execute([$requestID]);
  $request = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$request || !in_array($request["Status"], ["Accepted", "Approved"], true)) {
    workflow_error(409, "Request is not ready for delivery");
  }
  $stmt = $pdo->prepare("UPDATE delivery_schedule SET Status = 'Delivered' WHERE ScheduleID = ?");
  $stmt->execute([$scheduleID]);
  $stmt = $pdo->prepare(
    "UPDATE donation_request SET Status = 'Delivered', RespondedAt = NOW() WHERE RequestID = ?",
  );
  $stmt->execute([$requestID]);
  $stmt = $pdo->prepare("UPDATE donation SET Status = 'Delivered' WHERE DonationID = ?");
  $stmt->execute([$donationID]);
  $stmt = $pdo->prepare(
    "INSERT INTO notification (UserID, DonationID, Title, Message, Status, IsRead) SELECT UserID, ?, 'Donation Delivered', 'Your donation has been marked as delivered by the donor.', 'Unread', 0 FROM needy_person WHERE NeedyID = ?",
  );
  $stmt->execute([$donationID, $request["NeedyID"]]);
  $pdo->commit();
  echo json_encode(["status" => "success", "message" => "Delivery completed successfully"]);
} catch (PDOException $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  auth_error(500, "Could not save changes. Please try again");
}
