<?php
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (
    empty($data['needyID']) ||
    empty($data['helpType']) ||
    empty($data['description'])
) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "needyID, helpType and description are required"]);
    exit();
}

$needyID     = (int)$data['needyID'];
$helpType    = trim($data['helpType']);
$description = trim($data['description']);
$quantity    = isset($data['quantity']) ? trim($data['quantity']) : null;
$urgency     = isset($data['urgency']) ? trim($data['urgency']) : 'Normal';

try {
    $stmt = $pdo->prepare("
        INSERT INTO help_request (NeedyID, HelpType, Description, Quantity, Urgency, Status)
        VALUES (?, ?, ?, ?, ?, 'Pending')
    ");
    $stmt->execute([$needyID, $helpType, $description, $quantity, $urgency]);

    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Help request submitted successfully",
        "data" => ["helpRequestID" => $pdo->lastInsertId()]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}