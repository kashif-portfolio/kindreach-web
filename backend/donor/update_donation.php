<?php
require_once '../db_connect.php';

$currentUser = require_login(['Donor']);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    auth_error(405, 'Only POST allowed');
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    auth_error(400, 'Please send valid donation details');
}

$donationID = filter_var($data['donationID'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
$typeID = filter_var($data['typeID'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
$quantity = filter_var($data['quantity'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 2147483647]]);
$title = is_string($data['title'] ?? null) ? trim($data['title']) : '';
$description = is_string($data['description'] ?? null) ? trim($data['description']) : '';
$location = is_string($data['location'] ?? null) ? trim($data['location']) : '';

if (!$donationID || !$typeID || !$quantity || $title === '' || $description === '' || $location === '') {
    auth_error(400, 'Title, description, category, positive whole-number quantity and location are required');
}
if (mb_strlen($title, 'UTF-8') > 100 || mb_strlen($location, 'UTF-8') > 255) {
    auth_error(400, 'Title must be at most 100 characters and location at most 255 characters');
}

try {
    $pdo->beginTransaction();

    // Lock this donation until the edit finishes, then check owner and status.
    $stmt = $pdo->prepare('SELECT DonorID, Status FROM donation WHERE DonationID = ? FOR UPDATE');
    $stmt->execute([$donationID]);
    $donation = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$donation) {
        $pdo->rollBack();
        auth_error(404, 'Donation not found');
    }
    if ((int)$donation['DonorID'] !== (int)$currentUser['donorID']) {
        $pdo->rollBack();
        auth_error(403, 'You can only edit your own donations');
    }
    if ($donation['Status'] !== 'Available') {
        $pdo->rollBack();
        auth_error(409, 'Only available donations can be edited. Please refresh the list');
    }

    // Use real category IDs from the database, not hardcoded numbers.
    $stmt = $pdo->prepare('SELECT TypeID FROM donation_type WHERE TypeID = ?');
    $stmt->execute([$typeID]);
    if (!$stmt->fetch()) {
        $pdo->rollBack();
        auth_error(400, 'Please select an existing donation category');
    }

    $stmt = $pdo->prepare('UPDATE donation SET Title = ?, Description = ?, TypeID = ?, Quantity = ?, Location = ? WHERE DonationID = ? AND DonorID = ? AND Status = \'Available\'');
    $stmt->execute([$title, $description, $typeID, $quantity, $location, $donationID, $currentUser['donorID']]);

    // Return saved values so the table shows exactly what is in the database.
    $stmt = $pdo->prepare("
        SELECT d.DonationID AS id, d.Title AS title, d.Description AS description,
               d.TypeID AS typeID, dt.TypeName AS category, d.Quantity AS quantity,
               d.Location AS location, d.Status AS status, DATE(d.CreatedAt) AS date
        FROM donation d JOIN donation_type dt ON dt.TypeID = d.TypeID
        WHERE d.DonationID = ?
    ");
    $stmt->execute([$donationID]);
    $updatedDonation = $stmt->fetch(PDO::FETCH_ASSOC);
    $pdo->commit();

    echo json_encode(['status' => 'success', 'message' => 'Donation updated successfully', 'data' => $updatedDonation]);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Could not update donation. Please try again']);
}
