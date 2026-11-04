<?php

// Apni donations ki list
require_once "../db_connect.php";

$currentUser = require_login(["Donor"]);
require_own_id($_GET["donorID"] ?? 0, $currentUser["donorID"]);

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
  http_response_code(405);
  echo json_encode(["status" => "error", "message" => "Only GET method is allowed"]);
  exit();
}

// URL ki donor ID session se check hoti hai.
if (empty($_GET["donorID"])) {
  http_response_code(400);
  echo json_encode(["status" => "error", "message" => "donorID is required"]);
  exit();
}

$donorID = (int) $_GET["donorID"];

// Database ka kaam
try {
  $stmt = $pdo->prepare("
        SELECT 
            d.DonationID,
            d.TypeID,
            d.Title,
            d.Description,
            d.Quantity,
            d.Location,
            d.UrgencyLevel,
            d.Status,
            d.CreatedAt,
            dt.TypeName
        FROM donation d
        JOIN donation_type dt ON d.TypeID = dt.TypeID
        WHERE d.DonorID = ?
        ORDER BY d.CreatedAt DESC
    ");
  $stmt->execute([$donorID]);
  $donations = $stmt->fetchAll(PDO::FETCH_ASSOC);

  http_response_code(200);
  echo json_encode([
    "status" => "success",
    "message" => "Donations fetched successfully",
    "data" => $donations,
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => "Failed to fetch donations: " . $e->getMessage(),
  ]);
}
