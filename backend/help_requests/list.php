<?php

// Role ke mutabiq general help requests
require_once "../db_connect.php";
$user = require_login();
if ($_SERVER["REQUEST_METHOD"] !== "GET") {
  auth_error(405, "Only GET allowed");
}

// Database ka kaam
try {
  $sql = "SELECT h.*, u.Name AS NeedyName, np.VerificationStatus,
        CASE WHEN dr.Status = 'Delivered' THEN 'Delivered' ELSE h.Status END AS DisplayStatus,
        d.Title AS DonationTitle, dn.DonorID AS AssignedDonorID
        FROM help_request h JOIN needy_person np ON np.NeedyID = h.NeedyID
        JOIN user u ON u.UserID = np.UserID
        LEFT JOIN donation_request dr ON dr.RequestID = h.DonationRequestID
        LEFT JOIN donation d ON d.DonationID = dr.DonationID
        LEFT JOIN donor dn ON dn.DonorID = d.DonorID";
  $args = [];
  if ($user["role"] === "Needy") {
    $sql .= " WHERE h.NeedyID = ?";
    $args[] = $user["needyID"];
  } elseif ($user["role"] === "Donor") {
    $sql .=
      " WHERE (h.Status = 'Approved' AND h.DonationRequestID IS NULL AND np.VerificationStatus = 'Verified' AND u.Status = 'Active') OR dn.DonorID = ?";
    $args[] = $user["donorID"];
  } elseif ($user["role"] !== "Admin") {
    auth_error(403, "Permission denied");
  }
  $stmt = $pdo->prepare($sql . " ORDER BY h.CreatedAt DESC");
  $stmt->execute($args);
  echo json_encode(["status" => "success", "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
} catch (PDOException $e) {
  auth_error(500, "Could not load help requests. Check the required database columns");
}
