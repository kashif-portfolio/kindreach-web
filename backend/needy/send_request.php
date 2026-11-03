<?php
// ============================================
// KindReach - Send Donation Request (Needy)
// ============================================

require_once '../db_connect.php';
require_once '../donation_workflow.php';

$currentUser = require_login(['Needy']);
if (($currentUser['verificationStatus'] ?? '') !== 'Verified') {
    auth_error(403, 'Your account must be verified by admin before requesting help');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST method is allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

require_own_id($data['needyID'] ?? 0, $currentUser['needyID']);

if (empty($data['donationID']) || empty($data['needyID'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "donationID and needyID are required"]);
    exit();
}

$donationID = (int)$data['donationID'];
$needyID    = (int)$data['needyID'];
$message    = isset($data['message']) ? trim($data['message']) : null;

try {
    $pdo->beginTransaction();
    // Check donation available hai?
    $stmt = $pdo->prepare("SELECT Status FROM donation WHERE DonationID = ? FOR UPDATE");
    $stmt->execute([$donationID]);
    $donation = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$donation || $donation['Status'] !== 'Available') {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Donation not available"]);
        exit();
    }

    verified_recipient($needyID);

    // Pehle se request to nahi bheji?
    $stmt = $pdo->prepare("
        SELECT RequestID FROM donation_request 
        WHERE DonationID = ? AND NeedyID = ? AND Status = 'Pending'
    ");
    $stmt->execute([$donationID, $needyID]);
    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(["status" => "error", "message" => "You already requested this donation"]);
        exit();
    }

    // Insert request
    $stmt = $pdo->prepare("
        INSERT INTO donation_request (DonationID, NeedyID, Message, Status)
        VALUES (?, ?, ?, 'Pending')
    ");
    $stmt->execute([$donationID, $needyID, $message]);

    $requestID = $pdo->lastInsertId();

    $pdo->commit();
    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Request sent successfully",
        "data" => ["requestID" => $requestID]
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}