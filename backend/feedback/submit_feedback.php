<?php
require_once '../db_connect.php';

$currentUser = require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST allowed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

require_own_id($data['userID'] ?? 0, $currentUser['userID']);

if (empty($data['userID']) || empty($data['rating']) || empty($data['comments'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "userID, rating and comments are required"]);
    exit();
}

$userID    = (int)$data['userID'];
$rating    = (int)$data['rating'];
$comments  = trim($data['comments']);
$requestID = isset($data['requestID']) ? (int)$data['requestID'] : null;

if ($rating < 1 || $rating > 5) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Rating must be 1 to 5"]);
    exit();
}

// If feedback references a donation request, the user must be involved.
if ($requestID !== null) {
    $check = $pdo->prepare("
        SELECT dr.RequestID FROM donation_request dr
        JOIN donation d ON d.DonationID = dr.DonationID
        JOIN donor dn ON dn.DonorID = d.DonorID
        JOIN needy_person np ON np.NeedyID = dr.NeedyID
        WHERE dr.RequestID = ? AND (dn.UserID = ? OR np.UserID = ?)
    ");
    $check->execute([$requestID, $currentUser['userID'], $currentUser['userID']]);
    if (!$check->fetch()) {
        auth_error(403, 'You can only review your own donation requests');
    }
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO feedback (RequestID, UserID, Rating, Comments, FeedbackDate)
        VALUES (?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$requestID, $userID, $rating, $comments]);

    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Feedback submitted successfully",
        "data" => ["feedbackID" => $pdo->lastInsertId()]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed: " . $e->getMessage()]);
}