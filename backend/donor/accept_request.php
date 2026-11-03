<?php
// ============================================
// KindReach - Accept Donation Request
// ============================================

require_once '../db_connect.php';

$currentUser = require_login(['Donor']);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST method is allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['requestID'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "requestID is required"]);
    exit();
}

$requestID = (int) $data['requestID'];

require_donor_request($requestID, $currentUser['donorID']);

try {
    $pdo->beginTransaction();

    // Request status update
    $stmt = $pdo->prepare("
        UPDATE donation_request 
        SET Status = 'Accepted', RespondedAt = NOW() 
        WHERE RequestID = ? AND Status = 'Pending'
    ");
    $stmt->execute([$requestID]);

    if ($stmt->rowCount() === 0) {
        $pdo->rollBack();
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Request not found or already handled"]);
        exit();
    }

    // Donation status → Assigned
    $stmt = $pdo->prepare("
        UPDATE donation d
        JOIN donation_request dr ON d.DonationID = dr.DonationID
        SET d.Status = 'Assigned'
        WHERE dr.RequestID = ?
    ");
    $stmt->execute([$requestID]);

    // Needy UserID + donation title for notification
    $info = $pdo->prepare("
        SELECT 
            np.UserID AS NeedyUserID,
            d.DonationID,
            d.Title AS DonationTitle
        FROM donation_request dr
        JOIN needy_person np ON dr.NeedyID = np.NeedyID
        JOIN donation d ON dr.DonationID = d.DonationID
        WHERE dr.RequestID = ?
    ");
    $info->execute([$requestID]);
    $row = $info->fetch(PDO::FETCH_ASSOC);

    if ($row && !empty($row['NeedyUserID'])) {
        $title = 'Request Accepted';
        $msg = 'Your request for "' . ($row['DonationTitle'] ?: 'a donation') . '" was accepted by the donor.';
        $n = $pdo->prepare("
            INSERT INTO notification (UserID, DonationID, Title, Message, Status, IsRead)
            VALUES (?, ?, ?, ?, 'Unread', 0)
        ");
        $n->execute([
            (int) $row['NeedyUserID'],
            $row['DonationID'] ? (int) $row['DonationID'] : null,
            $title,
            $msg
        ]);
    }

    $pdo->commit();

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Request accepted successfully"
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}