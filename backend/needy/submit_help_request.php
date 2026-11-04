<?php

// General help request save karo.
require_once "../db_connect.php";
require_once "../document_files.php";
$user = require_login(["Needy"]);
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  auth_error(405, "Only POST allowed");
}
if (($user["verificationStatus"] ?? "") !== "Verified") {
  auth_error(403, "Admin verification is required before requesting help");
}
// Form ke saath document ki file bhi aati hai.
$data = $_POST ?: json_decode(file_get_contents("php://input"), true);
require_own_id($data["needyID"] ?? 0, $user["needyID"]);
$type = trim($data["helpType"] ?? "");
$description = trim($data["description"] ?? "");
$quantity = trim($data["quantity"] ?? "");
$urgency = $data["urgency"] ?? "Normal";
if (
  !$type ||
  !$description ||
  !$quantity ||
  !in_array($urgency, ["Normal", "Priority", "Urgent"], true)
) {
  auth_error(400, "Valid help type, description, quantity and urgency required");
}
$filename = save_supporting_file("document");

// Database ka kaam
try {
  $stmt = $pdo->prepare(
    "INSERT INTO help_request (NeedyID,HelpType,Description,Quantity,Urgency,Status,SupportingDocument) VALUES (?,?,?,?,?,'Pending',?)",
  );
  $stmt->execute([$user["needyID"], $type, $description, $quantity, $urgency, $filename]);
  echo json_encode([
    "status" => "success",
    "message" => "Help request submitted",
    "data" => ["helpRequestID" => $pdo->lastInsertId()],
  ]);
} catch (PDOException $e) {
  if ($filename) {
    unlink(document_directory() . "/" . $filename);
  }
  auth_error(500, "Could not save help request. Check the required database columns");
}
