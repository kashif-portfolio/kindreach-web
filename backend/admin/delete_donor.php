<?php
require_once '../db_connect.php';
$user = require_login(['Admin']);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') auth_error(405, 'Only POST allowed');
$data = json_decode(file_get_contents('php://input'), true);
$id=(int)($data['userID']??0);
if($id<1) auth_error(400,'Valid userID required');
try {
    $pdo->beginTransaction();
    $stmt=$pdo->prepare('SELECT DonorID FROM donor WHERE UserID = ? FOR UPDATE'); $stmt->execute([$id]); $donor=$stmt->fetch(PDO::FETCH_ASSOC);
    if(!$donor) { $pdo->rollBack(); auth_error(404,'Donor not found'); }
    // Never cascade-delete donations, requests or complaint history.
    $stmt=$pdo->prepare('SELECT DonationID FROM donation WHERE DonorID = ? LIMIT 1'); $stmt->execute([$donor['DonorID']]);
    $hasDonation=(bool)$stmt->fetch();
    $stmt=$pdo->prepare('SELECT ComplaintID FROM complaint WHERE UserID = ? LIMIT 1'); $stmt->execute([$id]);
    if($hasDonation || $stmt->fetch()) { $pdo->rollBack(); auth_error(409,'This donor has donations or complaint history. Block the account instead'); }
    $stmt=$pdo->prepare('DELETE FROM donor WHERE DonorID = ?'); $stmt->execute([$donor['DonorID']]);
    $stmt=$pdo->prepare('DELETE FROM user WHERE UserID = ?'); $stmt->execute([$id]);
    $pdo->commit(); echo json_encode(['status'=>'success']);
} catch (PDOException $e) { if ($pdo->inTransaction()) $pdo->rollBack(); auth_error(500, 'Could not save changes. Check for duplicate email or linked records'); }
