<?php
require_once '../db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$reportType = isset($data['reportType']) ? trim($data['reportType']) : '';
$fromDate = isset($data['fromDate']) ? trim($data['fromDate']) : '';
$toDate = isset($data['toDate']) ? trim($data['toDate']) : '';

if (!$reportType) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "reportType required"]);
    exit();
}

// Default date range if empty
if (!$fromDate) $fromDate = '2020-01-01';
if (!$toDate) $toDate = date('Y-m-d');

try {
    $rows = [];

    // 1) Total Donations
    if ($reportType === 'total_donations' || $reportType === 'Total Donations') {
        $stmt = $pdo->prepare("
            SELECT 
                d.DonationID AS id,
                d.Title AS title,
                u.Name AS donor,
                d.Quantity AS amount,
                DATE(d.CreatedAt) AS date,
                d.Status AS status
            FROM donation d
            LEFT JOIN donor dn ON d.DonorID = dn.DonorID
            LEFT JOIN user u ON dn.UserID = u.UserID
            WHERE DATE(d.CreatedAt) BETWEEN ? AND ?
            ORDER BY d.CreatedAt DESC
        ");
        $stmt->execute([$fromDate, $toDate]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // 2) Active Donors
    elseif ($reportType === 'active_donors' || $reportType === 'Active Donors') {
        $stmt = $pdo->prepare("
            SELECT 
                dn.DonorID AS id,
                u.Name AS name,
                u.Email AS email,
                u.Status AS status,
                COUNT(d.DonationID) AS totalDonations
            FROM donor dn
            JOIN user u ON dn.UserID = u.UserID
            LEFT JOIN donation d ON d.DonorID = dn.DonorID
                AND DATE(d.CreatedAt) BETWEEN ? AND ?
            WHERE u.Status IN ('Approved', 'Active', 'Verified')
            GROUP BY dn.DonorID, u.Name, u.Email, u.Status
            ORDER BY totalDonations DESC
        ");
        $stmt->execute([$fromDate, $toDate]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // 3) Completed Charity Requests
    elseif ($reportType === 'completed_requests' || $reportType === 'Completed Charity Requests') {
        $stmt = $pdo->prepare("
            SELECT 
                dr.RequestID AS id,
                d.Title AS title,
                nu.Name AS requester,
                dt.TypeName AS category,
                DATE(dr.RequestDate) AS date,
                dr.Status AS status
            FROM donation_request dr
            LEFT JOIN donation d ON dr.DonationID = d.DonationID
            LEFT JOIN donation_type dt ON d.TypeID = dt.TypeID
            LEFT JOIN needy_person np ON dr.NeedyID = np.NeedyID
            LEFT JOIN user nu ON np.UserID = nu.UserID
            WHERE dr.Status IN ('Delivered', 'Accepted', 'Approved')
              AND DATE(dr.RequestDate) BETWEEN ? AND ?
            ORDER BY dr.RequestDate DESC
        ");
        $stmt->execute([$fromDate, $toDate]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Unknown reportType"]);
        exit();
    }

    echo json_encode([
        "status" => "success",
        "reportType" => $reportType,
        "fromDate" => $fromDate,
        "toDate" => $toDate,
        "count" => count($rows),
        "data" => $rows
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}