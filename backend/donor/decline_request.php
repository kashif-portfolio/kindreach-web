<?php
// ============================================
// KindReach - Decline Donation Request
// ============================================

require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST method is allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['requestID'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "requestID is required"]);
    exit();
}

$requestID = (int)$data['requestID'];

try {
    $stmt = $pdo->prepare("
        UPDATE donation_request 
        SET Status = 'Declined', RespondedAt = NOW() 
        WHERE RequestID = ? AND Status = 'Pending'
    ");
    $stmt->execute([$requestID]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Request not found or already handled"]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Request declined successfully"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}