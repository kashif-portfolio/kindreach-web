<?php
require_once '../db_connect.php';

$donorID = isset($_GET['donorID']) ? (int)$_GET['donorID'] : 0;
if (!$donorID) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "donorID required"]);
    exit();
}

try {
    $stmt = $pdo->prepare("
        SELECT 
            ds.*,
            d.Title AS DonationTitle,
            u.Name AS NeedyName
        FROM delivery_schedule ds
        JOIN donation_request dr ON ds.RequestID = dr.RequestID
        JOIN donation d ON dr.DonationID = d.DonationID
        JOIN needy_person np ON dr.NeedyID = np.NeedyID
        JOIN user u ON np.UserID = u.UserID
        WHERE ds.DonorID = ?
        ORDER BY ds.DeliveryDate DESC
    ");
    $stmt->execute([$donorID]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode(["status" => "success", "data" => $rows]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}