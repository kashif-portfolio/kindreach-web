<?php
require_once '../db_connect.php';
require_once 'chat_access.php';
$user = require_login(['Donor','Needy']);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') auth_error(405, 'Only POST allowed');
$data = json_decode(file_get_contents('php://input'),true);
$requestID = (int)($data['requestID'] ?? 0);
$message = is_string($data['message'] ?? null) ? trim($data['message']) : '';
if ($message === '' || mb_strlen($message,'UTF-8') > 2000) auth_error(400,'Message must contain 1 to 2000 characters');
try {
    require_chat_request($requestID,$user,true);
    $stmt = $pdo->prepare('INSERT INTO messages (RequestID,UserID,Message) VALUES (?,?,?)');
    $stmt->execute([$requestID,$user['userID'],$message]);
    $messageID = $pdo->lastInsertId();
    $stmt = $pdo->prepare('SELECT CreatedAt FROM messages WHERE MessageID = ?');
    $stmt->execute([$messageID]);
    $saved = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(['status'=>'success','message'=>'Message sent','data'=>['messageID'=>$messageID,'createdAt'=>$saved['CreatedAt']]]);
} catch (PDOException $e) {
    auth_error(500,'Could not send message. Please try again');
}
