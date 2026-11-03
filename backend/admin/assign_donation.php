<?php
require_once '../db_connect.php';
require_once '../donation_workflow.php';
$currentUser = require_login(['Admin']);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') auth_error(405, 'Only POST allowed');
$data = json_decode(file_get_contents('php://input'), true);
$donationID = (int)($data['donationID'] ?? 0);
$needyID = (int)($data['needyID'] ?? 0);
if ($donationID < 1 || $needyID < 1) auth_error(400, 'donationID and needyID required');
try {
    $pdo->beginTransaction();
    $donation = lock_donation($donationID);
    if ($donation['Status'] !== 'Available') workflow_error(409, 'Donation is no longer available');
    verified_recipient($needyID);
    // Reuse this applicant's pending request when one already exists.
    $stmt = $pdo->prepare("SELECT RequestID FROM donation_request WHERE DonationID = ? AND NeedyID = ? AND Status = 'Pending' FOR UPDATE");
    $stmt->execute([$donationID, $needyID]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($existing) {
        $requestID = $existing['RequestID'];
    } else {
        $stmt = $pdo->prepare("INSERT INTO donation_request (DonationID, NeedyID, Status, Message, RequestDate) VALUES (?, ?, 'Pending', 'Assigned by admin', NOW())");
        $stmt->execute([$donationID, $needyID]);
        $requestID = $pdo->lastInsertId();
    }
    approve_donation_request($requestID);
    $pdo->commit();
    echo json_encode(['status' => 'success', 'message' => 'Donation assigned successfully']);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    auth_error(500, 'Could not save changes. Please try again');
}
