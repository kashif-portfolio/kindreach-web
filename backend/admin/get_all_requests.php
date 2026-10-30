<?php
// ============================================
// KindReach - Get All Donation Requests (Admin)
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
            dr.RequestID,
            dr.Status,
            dr.RequestDate,
            dr.Message,
            d.Title AS Item,
            dt.TypeName AS Type,
            donor_user.Name AS DonorName,
            needy_user.Name AS NeedyName
        FROM donation_request dr
        LEFT JOIN donation d ON dr.DonationID = d.DonationID
        LEFT JOIN donation_type dt ON d.TypeID = dt.TypeID
        LEFT JOIN donor dn ON d.DonorID = dn.DonorID
        LEFT JOIN user donor_user ON dn.UserID = donor_user.UserID
        LEFT JOIN needy_person np ON dr.NeedyID = np.NeedyID
        LEFT JOIN user needy_user ON np.UserID = needy_user.UserID
        ORDER BY dr.RequestID ASC
    ");
    $stmt->execute();
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "All requests fetched successfully",
        "data" => $requests
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}