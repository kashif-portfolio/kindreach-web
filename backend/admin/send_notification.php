<?php
require_once '../db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['title']) || empty($data['message']) || empty($data['sendTo'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "title, message, sendTo required"]);
    exit();
}

$title = trim($data['title']);
$message = trim($data['message']);
$sendTo = trim($data['sendTo']);

try {
    $userIds = [];

    if ($sendTo === 'Needy') {
        $stmt = $pdo->query("
            SELECT u.UserID FROM user u
            INNER JOIN role r ON u.RoleID = r.RoleID
            WHERE r.RoleName = 'Needy'
        ");
        $userIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
    } elseif ($sendTo === 'Donors') {
        $stmt = $pdo->query("
            SELECT u.UserID FROM user u
            INNER JOIN role r ON u.RoleID = r.RoleID
            WHERE r.RoleName = 'Donor'
        ");
        $userIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
    } elseif ($sendTo === 'All') {
        $stmt = $pdo->query("
            SELECT u.UserID FROM user u
            INNER JOIN role r ON u.RoleID = r.RoleID
            WHERE r.RoleName IN ('Donor', 'Needy')
        ");
        $userIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid sendTo"]);
        exit();
    }

    if (count($userIds) === 0) {
        echo json_encode(["status" => "error", "message" => "No users found"]);
        exit();
    }

    $ins = $pdo->prepare("
        INSERT INTO notification (UserID, DonationID, Title, Message, Status, IsRead)
        VALUES (?, NULL, ?, ?, 'Unread', 0)
    ");

    foreach ($userIds as $uid) {
        $ins->execute([(int) $uid, $title, $message]);
    }

    echo json_encode([
        "status" => "success",
        "message" => "Notification sent",
        "count" => count($userIds)
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}