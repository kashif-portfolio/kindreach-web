<?php
require_once '../db_connect.php';
require_once '../donation_workflow.php';
$currentUser = require_login(['Donor']);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') auth_error(405, 'Only POST allowed');
$data = json_decode(file_get_contents('php://input'), true);
$requestID = (int)($data['requestID'] ?? 0);
if ($requestID < 1) auth_error(400, 'requestID required');
try {
    $pdo->beginTransaction();
    approve_donation_request($requestID, $currentUser['donorID']);
    $pdo->commit();
    echo json_encode(['status' => 'success', 'message' => 'Request accepted successfully']);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    auth_error(500, 'Could not save changes. Please try again');
}
