<?php
require_once '../db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    $stmt = $pdo->query("
        SELECT 
            dt.TypeID,
            dt.TypeName,
            dt.Description,
            COUNT(d.DonationID) AS TotalDonations
        FROM donation_type dt
        LEFT JOIN donation d ON d.TypeID = dt.TypeID
        GROUP BY dt.TypeID, dt.TypeName, dt.Description
        ORDER BY dt.TypeID ASC
    ");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "data" => $rows]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}