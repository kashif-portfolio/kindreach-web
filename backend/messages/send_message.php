<?php
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['userID']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "userID and message are required"]);
    exit();
}

$userID  = (int)$data['userID'];
$message = trim($data['message']);

try {
    $stmt = $pdo->prepare("INSERT INTO messages (UserID, Message) VALUES (?, ?)");
    $stmt->execute([$userID, $message]);

    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Message sent",
        "data" => ["messageID" => $pdo->lastInsertId()]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}