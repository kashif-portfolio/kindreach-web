<?php
require_once '../db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    $stmt = $pdo->query("
        SELECT 
            c.ComplaintID,
            c.UserID,
            c.Subject,
            c.Description,
            c.Status,
            c.AdminNote,
            c.CreatedAt,
            c.ResolvedAt,
            u.Name AS UserName,
            u.Email AS UserEmail,
            r.RoleName
        FROM complaint c
        JOIN user u ON c.UserID = u.UserID
        LEFT JOIN role r ON u.RoleID = r.RoleID
        ORDER BY c.CreatedAt DESC
    ");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "data" => $rows]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}