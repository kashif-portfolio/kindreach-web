<?php

// Admin ke liye donations ki list
require_once "../db_connect.php";

$currentUser = require_login(["Admin"]);

// Database ka kaam
try {
  $stmt = $pdo->query("
        SELECT 
            d.DonationID,
            d.Title,
            d.Description,
            d.Quantity,
            d.Location,
            d.UrgencyLevel,
            d.Status,
            d.CreatedAt,
            dt.TypeName,
            u.Name AS DonorName
        FROM donation d
        LEFT JOIN donation_type dt ON d.TypeID = dt.TypeID
        LEFT JOIN donor dn ON d.DonorID = dn.DonorID
        LEFT JOIN user u ON dn.UserID = u.UserID
        ORDER BY d.DonationID DESC
    ");
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode([
    "status" => "success",
    "data" => $rows,
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => $e->getMessage(),
  ]);
}
