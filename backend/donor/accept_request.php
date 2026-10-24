<?php
// ============================================
// KindReach - Accept Donation Request
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
    $pdo->beginTransaction();

    // Request status update
    $stmt = $pdo->prepare("
        UPDATE donation_request 
        SET Status = 'Accepted', RespondedAt = NOW() 
        WHERE RequestID = ? AND Status = 'Pending'
    ");
    $stmt->execute([$requestID]);

    if ($stmt->rowCount() === 0) {
        $pdo->rollBack();
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Request not found or already handled"]);
        exit();
    }

    // Us donation ka status bhi update (Assigned)
    $stmt = $pdo->prepare("
        UPDATE donation d
        JOIN donation_request dr ON d.DonationID = dr.DonationID
        SET d.Status = 'Assigned'
        WHERE dr.RequestID = ?
    ");
    $stmt->execute([$requestID]);

    $pdo->commit();

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Request accepted successfully"
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}