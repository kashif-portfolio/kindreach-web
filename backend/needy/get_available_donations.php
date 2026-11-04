<?php
// ============================================
// KindReach - Get Available Donations (for Needy)
// ============================================

require_once '../db_connect.php';

$currentUser = require_login(['Needy']);

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only GET method is allowed"]);
    exit();
}

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
            dt.TypeName,
            u.Name AS DonorName,
            (SELECT r.Status FROM donation_request r
             WHERE r.DonationID = d.DonationID AND r.NeedyID = ? AND r.Status = 'Pending'
             LIMIT 1) AS MyRequestStatus
        FROM donation d
        JOIN donation_type dt ON d.TypeID = dt.TypeID
        JOIN donor dn ON d.DonorID = dn.DonorID
        JOIN user u ON dn.UserID = u.UserID
        WHERE d.Status = 'Available'
        ORDER BY d.CreatedAt DESC
    ");
    // Sirf logged-in needy ki pending request ka status dikhayein.
    $stmt->execute([$currentUser['needyID']]);
    $donations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Available donations fetched",
        "data" => $donations
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}