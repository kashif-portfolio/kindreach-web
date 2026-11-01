<?php
// ============================================
// KindReach - Decline Donation Request
// ============================================

require_once '../db_connect.php';

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

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        UPDATE donation_request 
        SET Status = 'Declined', RespondedAt = NOW() 
        WHERE RequestID = ? AND Status = 'Pending'
    ");
    $stmt->execute([$requestID]);

    if ($stmt->rowCount() === 0) {
        $pdo->rollBack();
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Request not found or already handled"]);
        exit();
    }

    // Needy notification
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
        $title = 'Request Declined';
        $msg = 'Your request for "' . ($row['DonationTitle'] ?: 'a donation') . '" was declined by the donor.';
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
        "message" => "Request declined successfully"
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}