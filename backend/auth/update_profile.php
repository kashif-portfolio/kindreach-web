<?php
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['userID'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "userID is required"]);
    exit();
}

$userID  = (int)$data['userID'];
$name    = isset($data['name']) ? trim($data['name']) : null;
$phone   = isset($data['phone']) ? trim($data['phone']) : null;
$address = isset($data['address']) ? trim($data['address']) : null;

if (!$name) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Name is required"]);
    exit();
}

try {
    $stmt = $pdo->prepare("
        UPDATE user 
        SET Name = ?, Phone = ?, Address = ?
        WHERE UserID = ?
    ");
    $stmt->execute([$name, $phone, $address, $userID]);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Profile updated successfully",
        "data" => [
            "userID" => $userID,
            "name" => $name,
            "phone" => $phone,
            "address" => $address
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}