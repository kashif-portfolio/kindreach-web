<?php

// Delivered request par feedback save karo.
require_once "../db_connect.php";
$currentUser = require_login(["Donor", "Needy"]);
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  auth_error(405, "Only POST allowed");
}

// Frontend se aaya data
$data = json_decode(file_get_contents("php://input"), true);
if (!is_array($data)) {
  auth_error(400, "Please send valid feedback details");
}
require_own_id($data["userID"] ?? 0, $currentUser["userID"]);

// Request ID aur rating poore numbers hone chahiye.
$requestID = filter_var($data["requestID"] ?? null, FILTER_VALIDATE_INT);
$rating = filter_var($data["rating"] ?? null, FILTER_VALIDATE_INT);
$comments = is_string($data["comments"] ?? null) ? trim($data["comments"]) : "";
$userID = $currentUser["userID"];
if (!$requestID || $requestID < 1) {
  auth_error(400, "Please select a completed donation");
}
if (!$rating || $rating < 1 || $rating > 5) {
  auth_error(400, "Rating must be 1 to 5");
}
if ($comments === "") {
  auth_error(400, "Please write your feedback message");
}

// Database ka kaam
try {
  $pdo->beginTransaction();
  // Lock se ek request par do submissions saath save nahi honge.
  $stmt = $pdo->prepare("
        SELECT dr.Status AS RequestStatus, d.Status AS DonationStatus
        FROM donation_request dr
        JOIN donation d ON d.DonationID = dr.DonationID
        JOIN donor dn ON dn.DonorID = d.DonorID
        JOIN needy_person np ON np.NeedyID = dr.NeedyID
        WHERE dr.RequestID = ? AND (dn.UserID = ? OR np.UserID = ?)
        FOR UPDATE
    ");
  $stmt->execute([$requestID, $userID, $userID]);
  $request = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$request) {
    $pdo->rollBack();
    auth_error(403, "You can only review your own donation requests");
  }
  if ($request["RequestStatus"] !== "Delivered" || $request["DonationStatus"] !== "Delivered") {
    $pdo->rollBack();
    auth_error(409, "Feedback is available after the donation is delivered");
  }
  $stmt = $pdo->prepare("SELECT FeedbackID FROM feedback WHERE RequestID = ? AND UserID = ?");
  $stmt->execute([$requestID, $userID]);
  if ($stmt->fetch(PDO::FETCH_ASSOC)) {
    $pdo->rollBack();
    auth_error(409, "You already reviewed this donation request");
  }
  $stmt = $pdo->prepare('
        INSERT INTO feedback (RequestID, UserID, Rating, Comments, FeedbackDate)
        VALUES (?, ?, ?, ?, NOW())
    ');
  $stmt->execute([$requestID, $userID, $rating, $comments]);
  $feedbackID = $pdo->lastInsertId();
  $pdo->commit();
  http_response_code(201);
  echo json_encode([
    "status" => "success",
    "message" => "Feedback submitted successfully",
    "data" => ["feedbackID" => $feedbackID],
  ]);
} catch (PDOException $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  auth_error(500, "Could not save feedback. Please try again");
}
