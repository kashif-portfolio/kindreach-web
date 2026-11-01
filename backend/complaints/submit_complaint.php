<?php
require_once '../db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['userID']) || empty($data['subject']) || empty($data['description'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "userID, subject, description required"]);
    exit();
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO complaint (UserID, Subject, Description, Status)
        VALUES (?, ?, ?, 'Open')
    ");
    $stmt->execute([
        (int) $data['userID'],
        trim($data['subject']),
        trim($data['description'])
    ]);

    echo json_encode([
        "status" => "success",
        "message" => "Complaint submitted",
        "complaintID" => (int) $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}