<?php
// KindReach - Delete Needy Person (Admin)
// Deletes from needy_person and related user

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
    $pdo->beginTransaction();

    // Get UserID first
    $stmt = $pdo->prepare("SELECT UserID FROM needy_person WHERE NeedyID = ?");
    $stmt->execute([$needyID]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        $pdo->rollBack();
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Needy person not found"]);
        exit();
    }

    $userID = $row['UserID'];

    // Delete requests linked to this needy (if any)
    $stmt = $pdo->prepare("DELETE FROM donation_request WHERE NeedyID = ?");
    $stmt->execute([$needyID]);

    // Delete needy record
    $stmt = $pdo->prepare("DELETE FROM needy_person WHERE NeedyID = ?");
    $stmt->execute([$needyID]);

    // Delete user account
    $stmt = $pdo->prepare("DELETE FROM user WHERE UserID = ?");
    $stmt->execute([$userID]);

    $pdo->commit();

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Needy person deleted successfully"
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}