<?php

// Private chat ki ownership aur access
// Har request ki chat uske donor aur needy ke darmiyan hoti hai.
// Message bhejne wale ki ID PHP session se lo.
/**
 * @param int $requestID
 * @param array $user
 * @param bool $sending
 */
function require_chat_request($requestID, $user, $sending = false)
{
  global $pdo;
  if ($requestID < 1) {
    auth_error(400, "A valid requestID is required");
  }
  $stmt = $pdo->prepare("SELECT dr.RequestID, dr.Status,
        dn.UserID AS DonorUserID, np.UserID AS NeedyUserID,
        du.Status AS DonorStatus, nu.Status AS NeedyStatus, np.VerificationStatus
        FROM donation_request dr
        JOIN donation d ON d.DonationID = dr.DonationID
        JOIN donor dn ON dn.DonorID = d.DonorID
        JOIN needy_person np ON np.NeedyID = dr.NeedyID
        JOIN user du ON du.UserID = dn.UserID JOIN user nu ON nu.UserID = np.UserID
        WHERE dr.RequestID = ?");
  $stmt->execute([$requestID]);
  $request = $stmt->fetch(PDO::FETCH_ASSOC);
  if (
    !$request ||
    !in_array(
      (int) $user["userID"],
      [(int) $request["DonorUserID"], (int) $request["NeedyUserID"]],
      true,
    )
  ) {
    auth_error(403, "You can only access your own donation conversations");
  }
  if ($sending) {
    if (!in_array($request["Status"], ["Pending", "Accepted", "Approved", "Delivered"], true)) {
      auth_error(409, "This request is closed. You can still read its messages");
    }
    if (
      $request["DonorStatus"] !== "Active" ||
      $request["NeedyStatus"] !== "Active" ||
      $request["VerificationStatus"] !== "Verified"
    ) {
      auth_error(403, "Both accounts must be active and the recipient verified to send messages");
    }
  }
  return $request;
}
