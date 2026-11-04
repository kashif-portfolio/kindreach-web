<?php

// Apni donation requests ki conversations
require_once "../db_connect.php";
$user = require_login(["Donor", "Needy"]);
if ($_SERVER["REQUEST_METHOD"] !== "GET") {
  auth_error(405, "Only GET allowed");
}

// Database ka kaam
try {
  $stmt = $pdo->prepare("SELECT dr.RequestID, dr.Status AS RequestStatus,
        dn.UserID AS DonorUserID, np.UserID AS NeedyUserID,
        d.Title AS DonationTitle, du.Name AS DonorName, nu.Name AS NeedyName,
        du.Status AS DonorStatus, nu.Status AS NeedyStatus, np.VerificationStatus,
        latest.Message AS LastMessage, latest.CreatedAt AS LastMessageAt, dr.RequestDate
        FROM donation_request dr
        JOIN donation d ON d.DonationID = dr.DonationID
        JOIN donor dn ON dn.DonorID = d.DonorID
        JOIN needy_person np ON np.NeedyID = dr.NeedyID
        JOIN user du ON du.UserID = dn.UserID JOIN user nu ON nu.UserID = np.UserID
        LEFT JOIN messages latest ON latest.MessageID = (
            SELECT MAX(m.MessageID) FROM messages m WHERE m.RequestID = dr.RequestID
            AND m.UserID IN (dn.UserID,np.UserID)
        )
        WHERE dn.UserID = ? OR np.UserID = ?
        ORDER BY COALESCE(latest.CreatedAt,dr.RequestDate) DESC, dr.RequestID DESC");
  $stmt->execute([$user["userID"], $user["userID"]]);
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($rows as &$row) {
    $row["OtherUserID"] = $user["role"] === "Donor" ? $row["NeedyUserID"] : $row["DonorUserID"];
    $row["OtherName"] = $user["role"] === "Donor" ? $row["NeedyName"] : $row["DonorName"];
    $row["OtherRole"] = $user["role"] === "Donor" ? "Recipient" : "Donor";
    $row["CanSend"] =
      in_array($row["RequestStatus"], ["Pending", "Accepted", "Approved", "Delivered"], true) &&
      $row["DonorStatus"] === "Active" &&
      $row["NeedyStatus"] === "Active" &&
      $row["VerificationStatus"] === "Verified";
  }
  unset($row);
  echo json_encode(["status" => "success", "data" => $rows]);
} catch (PDOException $e) {
  auth_error(500, "Could not load conversations. Check the messages RequestID column");
}
