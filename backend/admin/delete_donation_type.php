<?php
require_once '../db_connect.php';

$currentUser = require_login(['Admin']);

$data = json_decode(file_get_contents("php://input"), true);
$typeID = isset($data['typeID']) ? (int)$data['typeID'] : 0;

if (!$typeID) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "typeID required"]);
    exit();
}

try {
    $stmt = $pdo->prepare("DELETE FROM donation_type WHERE TypeID = ?");
    $stmt->execute([$typeID]);
    echo json_encode(["status" => "success", "message" => "Type deleted"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Cannot delete (in use?): " . $e->getMessage()]);
}