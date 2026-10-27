<?php
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['userID']) || empty($data['rating']) || empty($data['comments'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "userID, rating and comments are required"]);
    exit();
}

$userID    = (int)$data['userID'];
$rating    = (int)$data['rating'];
$comments  = trim($data['comments']);
$requestID = isset($data['requestID']) ? (int)$data['requestID'] : null;

if ($rating < 1 || $rating > 5) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Rating must be 1 to 5"]);
    exit();
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO feedback (RequestID, UserID, Rating, Comments, FeedbackDate)
        VALUES (?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$requestID, $userID, $rating, $comments]);

    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Feedback submitted successfully",
        "data" => ["feedbackID" => $pdo->lastInsertId()]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}