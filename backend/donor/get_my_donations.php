<?php
// ============================================
// KindReach - Get My Donations API
// ============================================

require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only GET method is allowed"]);
    exit();
}

// donorID URL se aayega: ?donorID=1
if (empty($_GET['donorID'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "donorID is required"]);
    exit();
}

$donorID = (int)$_GET['donorID'];

try {
    $stmt = $pdo->prepare("
        SELECT 
            d.DonationID,
            d.Title,
            d.Description,
            d.Quantity,
            d.Location,
            d.UrgencyLevel,
            d.Status,
            d.CreatedAt,
            dt.TypeName
        FROM donation d
        JOIN donation_type dt ON d.TypeID = dt.TypeID
        WHERE d.DonorID = ?
        ORDER BY d.CreatedAt DESC
    ");
    $stmt->execute([$donorID]);
    $donations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Donations fetched successfully",
        "data" => $donations
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch donations: " . $e->getMessage()
    ]);
}