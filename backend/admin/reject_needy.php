<?php
// KindReach - Reject Needy Person (Admin)

require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST method is allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['needyID'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "needyID is required"]);
    exit();
}

$needyID = (int)$data['needyID'];

try {
    $stmt = $pdo->prepare("
        UPDATE needy_person 
        SET VerificationStatus = 'Rejected', VerifiedAt = NOW() 
        WHERE NeedyID = ?
    ");
    $stmt->execute([$needyID]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Needy person not found"]);
        exit();
    }

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Needy person rejected successfully"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}