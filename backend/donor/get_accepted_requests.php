<?php
require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only GET allowed"]);
    exit();
}

$donorID = isset($_GET['donorID']) ? (int)$_GET['donorID'] : 0;
if (!$donorID) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "donorID required"]);
    exit();
}

try {
    $stmt = $pdo->prepare("
        SELECT 
            dr.RequestID,
            d.Title AS DonationTitle,
            u.Name AS NeedyName
        FROM donation_request dr
        JOIN donation d ON dr.DonationID = d.DonationID
        JOIN needy_person np ON dr.NeedyID = np.NeedyID
        JOIN user u ON np.UserID = u.UserID
        WHERE d.DonorID = ? AND dr.Status = 'Accepted'
        ORDER BY dr.RequestDate DESC
    ");
    $stmt->execute([$donorID]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode(["status" => "success", "data" => $rows]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}