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
            m.MessageID,
            m.Message,
            m.CreatedAt,
            u.Name,
            u.UserID,
            r.RoleName
        FROM messages m
        JOIN user u ON m.UserID = u.UserID
        JOIN role r ON u.RoleID = r.RoleID
        ORDER BY m.CreatedAt ASC
        LIMIT 100
    ");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "data" => $rows
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}