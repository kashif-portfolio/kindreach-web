<?php

// Selected request ke messages
require_once "../db_connect.php";
require_once "chat_access.php";
$user = require_login(["Donor", "Needy"]);
if ($_SERVER["REQUEST_METHOD"] !== "GET") {
  auth_error(405, "Only GET allowed");
}
$requestID = (int) ($_GET["requestID"] ?? 0);

// Database ka kaam
try {
  $request = require_chat_request($requestID, $user);
  // Selected request ke saare messages lao.
  // Request aur dono participants ka filter private access ko enforce karta hai.
  $stmt = $pdo->prepare(
    "SELECT MessageID, UserID, Message, CreatedAt FROM messages WHERE RequestID = ? AND UserID IN (?, ?) ORDER BY MessageID ASC",
  );
  $stmt->execute([$requestID, $request["DonorUserID"], $request["NeedyUserID"]]);
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode(["status" => "success", "data" => $rows]);
} catch (PDOException $e) {
  auth_error(500, "Could not load private messages");
}
