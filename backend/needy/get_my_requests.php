<?php
// ============================================
// KindReach - Get My Requests (Needy)
// ============================================

require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only GET method is allowed"]);
    exit();
}

if (empty($_GET['needyID'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "needyID is required"]);
    exit();
}

$needyID = (int)$_GET['needyID'];

try {
    $stmt = $pdo->prepare("
        SELECT 
            dr.RequestID,
            dr.Message,
            dr.Status,
            dr.RequestDate,
            dr.RespondedAt,
            d.Title AS DonationTitle,
            d.Location,
            dt.TypeName,
            u.Name AS DonorName
        FROM donation_request dr
        JOIN donation d ON dr.DonationID = d.DonationID
        JOIN donation_type dt ON d.TypeID = dt.TypeID
        JOIN donor dn ON d.DonorID = dn.DonorID
        JOIN user u ON dn.UserID = u.UserID
        WHERE dr.NeedyID = ?
        ORDER BY dr.RequestDate DESC
    ");
    $stmt->execute([$needyID]);
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Requests fetched successfully",
        "data" => $requests
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}