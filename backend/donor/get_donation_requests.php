<?php
// ============================================
// KindReach - Get Donation Requests (for Donor)
// ============================================

require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only GET method is allowed"]);
    exit();
}

if (empty($_GET['donorID'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "donorID is required"]);
    exit();
}

$donorID = (int)$_GET['donorID'];

try {
    $stmt = $pdo->prepare("
        SELECT 
            dr.RequestID,
            dr.Message,
            dr.Status,
            dr.RequestDate,
            d.Title AS DonationTitle,
            d.DonationID,
            u.Name AS NeedyName,
            u.Phone AS NeedyPhone
        FROM donation_request dr
        JOIN donation d ON dr.DonationID = d.DonationID
        JOIN needy_person np ON dr.NeedyID = np.NeedyID
        JOIN user u ON np.UserID = u.UserID
        WHERE d.DonorID = ?
        ORDER BY dr.RequestDate DESC
    ");
    $stmt->execute([$donorID]);
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Requests fetched successfully",
        "data" => $requests
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch requests: " . $e->getMessage()
    ]);
}