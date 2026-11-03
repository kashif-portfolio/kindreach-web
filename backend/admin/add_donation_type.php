<?php
require_once '../db_connect.php';

$currentUser = require_login(['Admin']);

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['typeName'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "typeName required"]);
    exit();
}

$typeName = trim($data['typeName']);
$description = isset($data['description']) ? trim($data['description']) : '';

try {
    $stmt = $pdo->prepare("
        INSERT INTO donation_type (TypeName, Description) VALUES (?, ?)
    ");
    $stmt->execute([$typeName, $description]);

    echo json_encode([
        "status" => "success",
        "message" => "Type added",
        "data" => ["typeID" => $pdo->lastInsertId()]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}