<?php
require_once '../db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['donationID']) || empty($data['needyID'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "donationID and needyID required"]);
    exit();
}

$donationID = (int) $data['donationID'];
$needyID = (int) $data['needyID'];

try {
    // Optional: already assigned?
    $check = $pdo->prepare("
        SELECT RequestID FROM donation_request 
        WHERE DonationID = ? AND Status IN ('Pending', 'Accepted', 'Approved')
    ");
    $check->execute([$donationID]);
    if ($check->fetch()) {
        echo json_encode(["status" => "error", "message" => "Donation already has an active request"]);
        exit();
    }

    // Create request as Accepted (admin assigned)
    $stmt = $pdo->prepare("
        INSERT INTO donation_request (DonationID, NeedyID, Status, Message, RequestDate)
        VALUES (?, ?, 'Accepted', 'Assigned by admin', NOW())
    ");
    $stmt->execute([$donationID, $needyID]);

    // Update donation status
    $upd = $pdo->prepare("UPDATE donation SET Status = 'Approved' WHERE DonationID = ?");
    $upd->execute([$donationID]);

    echo json_encode([
        "status" => "success",
        "message" => "Donation assigned successfully"
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}