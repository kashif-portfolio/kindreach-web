<?php
// ============================================
// KindReach - Approve Donor (Admin)
// ============================================

require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST method is allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['userID'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "userID is required"]);
    exit();
}

$userID = (int)$data['userID'];

try {
    $stmt = $pdo->prepare("UPDATE user SET Status = 'Active' WHERE UserID = ?");
    $stmt->execute([$userID]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "User not found"]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Donor approved successfully"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}