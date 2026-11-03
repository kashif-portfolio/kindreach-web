<?php
require_once '../db_connect.php';

$currentUser = require_login();

$userID = isset($_GET['userID']) ? (int) $_GET['userID'] : 0;

// Only admin may view everybody's notification history.
if ($currentUser['role'] !== 'Admin') {
    require_own_id($userID, $currentUser['userID']);
}

try {
    if ($userID > 0) {
        $stmt = $pdo->prepare("
            SELECT NotificationID, Title, Message, Status, IsRead, CreatedAt
            FROM notification
            WHERE UserID = ?
            ORDER BY CreatedAt DESC
            LIMIT 30
        ");
        $stmt->execute([$userID]);
    } else {
        // Admin history only
        $stmt = $pdo->query("
            SELECT NotificationID, UserID, Title, Message, Status, CreatedAt
            FROM notification
            ORDER BY CreatedAt DESC
            LIMIT 100
        ");
    }
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "data" => $rows]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}