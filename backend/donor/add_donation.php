<?php
// ============================================
// KindReach - Add Donation API
// ============================================

require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST method is allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

// Required fields
if (
    empty($data['donorID']) ||
    empty($data['typeID']) ||
    empty($data['title']) ||
    empty($data['quantity'])
) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "donorID, typeID, title and quantity are required"
    ]);
    exit();
}

$donorID      = (int)$data['donorID'];
$typeID       = (int)$data['typeID'];
$title        = trim($data['title']);
$description  = isset($data['description']) ? trim($data['description']) : null;
$quantity     = (int)$data['quantity'];
$location     = isset($data['location']) ? trim($data['location']) : null;
$urgencyLevel = isset($data['urgencyLevel']) ? trim($data['urgencyLevel']) : 'Normal';

try {
    // Check donor exists
    $stmt = $pdo->prepare("SELECT DonorID FROM donor WHERE DonorID = ?");
    $stmt->execute([$donorID]);
    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Donor not found"]);
        exit();
    }

    // Insert donation
    $stmt = $pdo->prepare("
        INSERT INTO donation (DonorID, TypeID, Title, Description, Quantity, Location, UrgencyLevel, Status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'Available')
    ");
    $stmt->execute([
        $donorID,
        $typeID,
        $title,
        $description,
        $quantity,
        $location,
        $urgencyLevel
    ]);

    $donationID = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Donation added successfully",
        "data" => [
            "donationID" => $donationID,
            "title"      => $title,
            "quantity"   => $quantity,
            "status"     => "Available"
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to add donation: " . $e->getMessage()
    ]);
}