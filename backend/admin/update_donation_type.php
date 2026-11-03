<?php
require_once '../db_connect.php';
$user = require_login(['Admin']);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') auth_error(405, 'Only POST allowed');
$data = json_decode(file_get_contents('php://input'), true);
$id=(int)($data['typeID']??0); $name=trim($data['typeName']??''); $description=trim($data['description']??'');
if($id<1 || !$name || mb_strlen($name)>50 || mb_strlen($description)>255) auth_error(400,'Valid category name (max 50) and description (max 255) required');
try {
    $stmt=$pdo->prepare('SELECT TypeID FROM donation_type WHERE TypeID = ?'); $stmt->execute([$id]);
    if(!$stmt->fetch()) auth_error(404,'Category not found');
    $stmt=$pdo->prepare('UPDATE donation_type SET TypeName = ?, Description = ? WHERE TypeID = ?'); $stmt->execute([$name,$description,$id]);
    echo json_encode(['status'=>'success']);
} catch (PDOException $e) { if ($pdo->inTransaction()) $pdo->rollBack(); auth_error(500, 'Could not save changes. Check for duplicate email or linked records'); }
