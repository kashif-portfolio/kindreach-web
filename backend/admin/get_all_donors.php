<?php
// ============================================
// KindReach - Get All Donors (Admin)
// ============================================

require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only GET method is allowed"]);
    exit();
}

try {
    $stmt = $pdo->prepare("
        SELECT 
            d.DonorID,
            u.UserID,
            u.Name,
            u.Email,
            u.Phone,
            u.Address,
            u.Status,
            u.CreatedAt,
            d.Organization,
            d.CNIC
        FROM donor d
        JOIN user u ON d.UserID = u.UserID
        ORDER BY u.CreatedAt DESC
    ");
    $stmt->execute();
    $donors = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Donors fetched successfully",
        "data" => $donors
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}