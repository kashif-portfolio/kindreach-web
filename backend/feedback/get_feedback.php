<?php
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only GET allowed"]);
    exit();
}

try {
    $stmt = $pdo->prepare("
        SELECT 
            f.FeedbackID,
            f.RequestID,
            f.UserID,
            f.Rating,
            f.Comments,
            f.FeedbackDate,
            u.Name
        FROM feedback f
        JOIN user u ON f.UserID = u.UserID
        ORDER BY f.FeedbackDate DESC
        LIMIT 20
    ");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Feedback fetched",
        "data" => $rows
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}