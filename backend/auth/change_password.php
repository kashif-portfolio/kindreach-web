<?php
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (
    empty($data['userID']) ||
    empty($data['currentPassword']) ||
    empty($data['newPassword'])
) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "userID, currentPassword and newPassword are required"]);
    exit();
}

$userID          = (int)$data['userID'];
$currentPassword = $data['currentPassword'];
$newPassword     = $data['newPassword'];

if (strlen($newPassword) < 6) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "New password must be at least 6 characters"]);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT Password FROM user WHERE UserID = ?");
    $stmt->execute([$userID]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "User not found"]);
        exit();
    }

    if (!password_verify($currentPassword, $user['Password'])) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Current password is incorrect"]);
        exit();
    }

    $hashed = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("UPDATE user SET Password = ? WHERE UserID = ?");
    $stmt->execute([$hashed, $userID]);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Password changed successfully"
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}