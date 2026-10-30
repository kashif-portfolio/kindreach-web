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

if (empty($data['requestID']) || empty($data['status'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "requestID and status required"]);
    exit();
}

$requestID = (int) $data['requestID'];
$status = trim($data['status']);

if ($status === 'Approved') {
    $status = 'Accepted';
}

try {
    $stmt = $pdo->prepare("UPDATE donation_request SET Status = ? WHERE RequestID = ?");
    $stmt->execute([$status, $requestID]);
    echo json_encode(["status" => "success", "message" => "Updated"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}