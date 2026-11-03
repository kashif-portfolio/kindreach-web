<?php
require_once '../db_connect.php';
require_once '../donation_workflow.php';
$user = require_login(['Donor']);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') auth_error(405, 'Only POST allowed');
$data = json_decode(file_get_contents('php://input'), true);
$id = (int)($data['helpRequestID'] ?? 0); $donationID = (int)($data['donationID'] ?? 0);
if ($id < 1 || $donationID < 1) auth_error(400, 'Select a help request and your available donation');
try {
    $pdo->beginTransaction();
    // Use the same donation-first locking order as normal allocation.
    $donation = lock_donation($donationID, $user['donorID']);
    if ($donation['Status'] !== 'Available') workflow_error(409, 'Donation no longer available');
    $stmt = $pdo->prepare('SELECT * FROM help_request WHERE HelpRequestID = ? FOR UPDATE');
    $stmt->execute([$id]); $request = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$request) workflow_error(404, 'Help request not found');
    if ($request['Status'] !== 'Approved' || $request['DonationRequestID']) workflow_error(409, 'Help request no longer available');
    verified_recipient($request['NeedyID']);
    $stmt = $pdo->prepare("SELECT RequestID FROM donation_request WHERE DonationID = ? AND NeedyID = ? AND Status = 'Pending' FOR UPDATE");
    $stmt->execute([$donationID,$request['NeedyID']]); $existing = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($existing) $requestID = $existing['RequestID'];
    else {
        $stmt = $pdo->prepare("INSERT INTO donation_request (DonationID, NeedyID, Message, Status) VALUES (?, ?, ?, 'Pending')");
        $stmt->execute([$donationID,$request['NeedyID'],'For help request #' . $id]);
        $requestID = $pdo->lastInsertId();
    }
    approve_donation_request($requestID, $user['donorID']);
    $stmt = $pdo->prepare("UPDATE help_request SET Status = 'Assigned', DonationRequestID = ? WHERE HelpRequestID = ?");
    $stmt->execute([$requestID,$id]);
    $pdo->commit();
    echo json_encode(['status'=>'success','message'=>'Help assigned. Schedule delivery from your delivery page']);
} catch (PDOException $e) { if ($pdo->inTransaction()) $pdo->rollBack(); auth_error(500, 'Could not fulfill help request'); }
