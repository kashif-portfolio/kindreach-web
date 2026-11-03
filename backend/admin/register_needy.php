<?php
require_once '../db_connect.php';
$user = require_login(['Admin']);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') auth_error(405, 'Only POST allowed');
$data = json_decode(file_get_contents('php://input'), true);
$name=trim($data['name']??''); $email=trim($data['email']??''); $phone=trim($data['phone']??''); $address=trim($data['location']??'');
$password=$data['password']??''; $cnic=trim($data['cnic']??''); $income=trim($data['reason']??''); $family=trim($data['householdSize']??'');
if(!$name || !filter_var($email,FILTER_VALIDATE_EMAIL) || !$phone || !$address || strlen($password)<6 || !$cnic || !$income || !$family) auth_error(400,'Complete all details, CNIC and a password of at least 6 characters');
try {
    $pdo->beginTransaction();
    $stmt=$pdo->prepare("SELECT RoleID FROM role WHERE RoleName = 'Needy'"); $stmt->execute(); $role=$stmt->fetch(PDO::FETCH_ASSOC);
    if(!$role) { $pdo->rollBack(); auth_error(500,'Needy role not configured'); }
    $stmt=$pdo->prepare("INSERT INTO user (RoleID,Name,Email,Password,Phone,Address,Status) VALUES (?,?,?,?,?,?,'Active')");
    $stmt->execute([$role['RoleID'],$name,$email,password_hash($password,PASSWORD_DEFAULT),$phone,$address]); $uid=$pdo->lastInsertId();
    $stmt=$pdo->prepare("INSERT INTO needy_person (UserID,CNIC,IncomeStatus,FamilyDetails,AddressDetails,VerificationStatus) VALUES (?,?,?,?,?,'Pending')");
    $stmt->execute([$uid,$cnic,$income,$family,$address]); $nid=$pdo->lastInsertId(); $pdo->commit();
    echo json_encode(['status'=>'success','data'=>['needyID'=>$nid,'userID'=>$uid]]);
} catch (PDOException $e) { if ($pdo->inTransaction()) $pdo->rollBack(); auth_error(500, 'Could not save changes. Check for duplicate email or linked records'); }
