<?php

// Feedback ke liye apni delivered requests
require_once "../db_connect.php";
$currentUser = require_login(["Donor", "Needy"]);
if ($_SERVER["REQUEST_METHOD"] !== "GET") {
  auth_error(405, "Only GET allowed");
}

// Database ka kaam
try {
  // Sirf apni delivered requests jin par is user ne feedback nahi diya.
  $stmt = $pdo->prepare("
        SELECT dr.RequestID, d.Title
        FROM donation_request dr
        JOIN donation d ON d.DonationID = dr.DonationID
        JOIN donor dn ON dn.DonorID = d.DonorID
        JOIN needy_person np ON np.NeedyID = dr.NeedyID
        WHERE dr.Status = 'Delivered' AND d.Status = 'Delivered'
          AND (dn.UserID = ? OR np.UserID = ?)
          AND NOT EXISTS (
              SELECT 1 FROM feedback f WHERE f.RequestID = dr.RequestID AND f.UserID = ?
          )
        ORDER BY dr.RequestID DESC
    ");
  $stmt->execute([$currentUser["userID"], $currentUser["userID"], $currentUser["userID"]]);
  echo json_encode(["status" => "success", "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
} catch (PDOException $e) {
  auth_error(500, "Could not load completed donations");
}
