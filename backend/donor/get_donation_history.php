<?php

// Delivered donations ki history
require_once "../db_connect.php";
$user = require_login(["Donor"]);
require_own_id($_GET["donorID"] ?? 0, $user["donorID"]);
if ($_SERVER["REQUEST_METHOD"] !== "GET") {
  auth_error(405, "Only GET allowed");
}

// Database ka kaam
try {
  // Har delivered donation ki ek row dikhao.
  // Purane duplicate records mein latest delivered request lo.
  $stmt = $pdo->prepare("SELECT d.DonationID, d.Title, d.Location, d.Status, dt.TypeName,
        u.Name AS RecipientName, dr.RespondedAt AS DeliveredAt
        FROM donation d JOIN donation_type dt ON dt.TypeID = d.TypeID
        LEFT JOIN donation_request dr ON dr.RequestID = (
            SELECT MAX(completed.RequestID) FROM donation_request completed
            WHERE completed.DonationID = d.DonationID AND completed.Status = 'Delivered'
        )
        LEFT JOIN needy_person np ON np.NeedyID = dr.NeedyID
        LEFT JOIN user u ON u.UserID = np.UserID
        WHERE d.DonorID = ? AND d.Status = 'Delivered'
        ORDER BY COALESCE(dr.RespondedAt,d.CreatedAt) DESC, d.DonationID DESC");
  $stmt->execute([$user["donorID"]]);
  echo json_encode(["status" => "success", "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
} catch (PDOException $e) {
  auth_error(500, "Could not load donation history. Please try again");
}
