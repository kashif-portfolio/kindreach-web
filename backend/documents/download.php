<?php
require_once '../db_connect.php';
require_once '../document_files.php';
$user = require_login();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') auth_error(405, 'Only GET allowed');
$helpID = (int)($_GET['helpRequestID'] ?? 0);
$needyID = (int)($_GET['needyID'] ?? 0);
if ($helpID > 0) {
    $stmt = $pdo->prepare('SELECT NeedyID, SupportingDocument FROM help_request WHERE HelpRequestID = ?');
    $stmt->execute([$helpID]); $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) auth_error(404, 'Help request not found');
    $needyID = $row['NeedyID']; $filename = $row['SupportingDocument'];
} else {
    $stmt = $pdo->prepare('SELECT SupportingDocuments FROM needy_person WHERE NeedyID = ?');
    $stmt->execute([$needyID]); $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $filename = $row['SupportingDocuments'] ?? null;
}
// Identity documents are for the applicant and admin only, never other donors.
if ($user['role'] !== 'Admin' && ($user['role'] !== 'Needy' || (int)$needyID !== (int)$user['needyID'])) auth_error(403, 'You cannot access this document');
if (!$filename || !preg_match('/^[a-f0-9]{32}\.(pdf|png|jpg)$/', $filename)) auth_error(404, 'No uploaded document');
$path = document_directory() . '/' . $filename;
if (!is_file($path)) auth_error(404, 'Document file not found');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="supporting-document.' . pathinfo($filename,PATHINFO_EXTENSION) . '"');
header('Access-Control-Expose-Headers: Content-Disposition');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: private, no-store');
readfile($path);
