<?php

// Apna supporting document upload karo.
require_once "../db_connect.php";
require_once "../document_files.php";
$user = require_login(["Needy"]);
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  auth_error(405, "Only POST allowed");
}
$filename = save_supporting_file("document");
if (!$filename) {
  auth_error(400, "Please select a supporting document");
}

// Database ka kaam
try {
  $stmt = $pdo->prepare("UPDATE needy_person SET SupportingDocuments = ? WHERE NeedyID = ?");
  $stmt->execute([$filename, $user["needyID"]]);
  echo json_encode([
    "status" => "success",
    "message" => "Supporting document uploaded",
    "data" => [
      "hasDocument" => true,
      "fileType" => pathinfo($filename, PATHINFO_EXTENSION),
      "fileSize" => filesize(document_directory() . "/" . $filename),
    ],
  ]);
} catch (PDOException $e) {
  unlink(document_directory() . "/" . $filename);
  auth_error(500, "Could not save document record");
}
