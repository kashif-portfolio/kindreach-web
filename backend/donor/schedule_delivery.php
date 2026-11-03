<?php
require_once '../db_connect.php';
require_once '../donation_workflow.php';

$currentUser = require_login(['Donor']);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

require_own_id($data['donorID'] ?? 0, $currentUser['donorID']);

if (
    empty($data['requestID']) ||
    empty($data['donorID']) ||
    empty($data['deliveryMethod']) ||
    empty($data['deliveryDate']) ||
    empty($data['address'])
) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "requestID, donorID, deliveryMethod, deliveryDate and address are required"]);
    exit();
}

$requestID       = (int)$data['requestID'];
$donorID         = (int)$data['donorID'];
$deliveryMethod  = trim($data['deliveryMethod']);
$deliveryDate    = trim($data['deliveryDate']);
$deliveryTime    = isset($data['deliveryTime']) ? trim($data['deliveryTime']) : null;
$address         = trim($data['address']);
$contactPerson   = isset($data['contactPerson']) ? trim($data['contactPerson']) : null;
$notes           = isset($data['notes']) ? trim($data['notes']) : null;

require_donor_request($requestID, $currentUser['donorID']);

try {
    $pdo->beginTransaction();
    $donation = lock_donation(request_donation_id($requestID), $currentUser['donorID']);
    if (!in_array($donation['Status'], ['Approved', 'Assigned'], true)) workflow_error(409, 'Donation is not allocated for delivery');
    $check = $pdo->prepare("SELECT Status FROM donation_request WHERE RequestID = ? FOR UPDATE");
    $check->execute([$requestID]);
    $request = $check->fetch(PDO::FETCH_ASSOC);
    if (!$request || !in_array($request['Status'], ['Accepted', 'Approved'], true)) workflow_error(409, 'Only accepted requests can be scheduled');
    $check = $pdo->prepare('SELECT ScheduleID FROM delivery_schedule WHERE RequestID = ? FOR UPDATE');
    $check->execute([$requestID]);
    if ($check->fetch()) workflow_error(409, 'This request already has a delivery schedule');

    $stmt = $pdo->prepare("
        INSERT INTO delivery_schedule 
        (RequestID, DonorID, DeliveryMethod, DeliveryDate, DeliveryTime, Address, ContactPerson, Notes, Status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Scheduled')
    ");
    $stmt->execute([
        $requestID, $donorID, $deliveryMethod, $deliveryDate,
        $deliveryTime, $address, $contactPerson, $notes
    ]);

    $pdo->commit();
    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Delivery scheduled successfully",
        "data" => ["scheduleID" => $pdo->lastInsertId()]
    ]);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}