<?php
require_once '../db_connect.php';
$currentUser = require_login(['Donor']);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') auth_error(405, 'Only POST allowed');
$data = json_decode(file_get_contents('php://input'), true);
$donationID = filter_var($data['donationID'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
if (!$donationID) auth_error(400, 'A valid donation ID is required');
try {
    $pdo->beginTransaction();
    // Lock the donation while checking owner, status and request history.
    $stmt = $pdo->prepare('SELECT DonorID, Status FROM donation WHERE DonationID = ? FOR UPDATE');
    $stmt->execute([$donationID]);
    $donation = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$donation) {
        $pdo->rollBack();
        auth_error(404, 'Donation not found. Please refresh the list');
    }
    if ((int)$donation['DonorID'] !== (int)$currentUser['donorID']) {
        $pdo->rollBack();
        auth_error(403, 'You can only delete your own donations');
    }
    if ($donation['Status'] !== 'Available') {
        $pdo->rollBack();
        auth_error(409, 'Only available donations can be deleted');
    }
    // Preserve request history instead of deleting it through foreign keys.
    $stmt = $pdo->prepare('SELECT RequestID FROM donation_request WHERE DonationID = ? LIMIT 1');
    $stmt->execute([$donationID]);
    if ($stmt->fetch()) {
        $pdo->rollBack();
        auth_error(409, 'This donation has requests and cannot be deleted because its request history must be preserved');
    }
    $stmt = $pdo->prepare("DELETE FROM donation WHERE DonationID = ? AND DonorID = ? AND Status = 'Available'");
    $stmt->execute([$donationID, $currentUser['donorID']]);
    $pdo->commit();
    echo json_encode(['status' => 'success', 'message' => 'Donation deleted successfully']);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Could not delete donation. Please try again']);
}
