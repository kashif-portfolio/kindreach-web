<?php
// ============================================
// KindReach - Get All Needy Persons (Admin)
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
            np.NeedyID,
            u.UserID,
            u.Name,
            u.Email,
            u.Phone,
            u.Address,
            u.Status,
            u.CreatedAt,
            np.CNIC,
            np.IncomeStatus,
            np.FamilyDetails,
            np.VerificationStatus,
            np.VerifiedAt
        FROM needy_person np
        JOIN user u ON np.UserID = u.UserID
        ORDER BY u.CreatedAt DESC
    ");
    $stmt->execute();
    $needy = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Needy persons fetched successfully",
        "data" => $needy
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}