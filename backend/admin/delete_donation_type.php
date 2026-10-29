<?php
require_once '../db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

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