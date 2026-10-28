<?php
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

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

try {
    $stmt = $pdo->prepare("
        INSERT INTO delivery_schedule 
        (RequestID, DonorID, DeliveryMethod, DeliveryDate, DeliveryTime, Address, ContactPerson, Notes, Status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Scheduled')
    ");
    $stmt->execute([
        $requestID, $donorID, $deliveryMethod, $deliveryDate,
        $deliveryTime, $address, $contactPerson, $notes
    ]);

    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Delivery scheduled successfully",
        "data" => ["scheduleID" => $pdo->lastInsertId()]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}