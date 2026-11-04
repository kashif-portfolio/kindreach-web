<?php

// Uploaded document ki details
require_once "../db_connect.php";
require_once "../document_files.php";
$user = require_login(["Needy"]);
$stmt = $pdo->prepare("SELECT SupportingDocuments FROM needy_person WHERE NeedyID = ?");
$stmt->execute([$user["needyID"]]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);
$filename = $row["SupportingDocuments"] ?? "";
$exists =
  preg_match('/^[a-f0-9]{32}\.(pdf|png|jpg)$/', $filename) &&
  is_file(document_directory() . "/" . $filename);
echo json_encode([
  "status" => "success",
  "data" => [
    "hasDocument" => (bool) $exists,
    "fileType" => $exists ? pathinfo($filename, PATHINFO_EXTENSION) : null,
    "fileSize" => $exists ? filesize(document_directory() . "/" . $filename) : null,
  ],
]);
