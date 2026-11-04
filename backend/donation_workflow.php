<?php

// Donation assign aur approve karne ke checks
// Poori donation ek verified needy ko milti hai.
// Assign ya deliver karte waqt pehle donation lock karo.
/**
 * @param int $status
 * @param string $message
 */
function workflow_error($status, $message)
{
  global $pdo;
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  auth_error($status, $message);
}

/**
 * @param int|string $donationID
 * @param int|string|null $donorID
 */
function lock_donation($donationID, $donorID = null)
{
  global $pdo;
  $stmt = $pdo->prepare("SELECT * FROM donation WHERE DonationID = ? FOR UPDATE");
  $stmt->execute([$donationID]);
  $donation = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$donation) {
    workflow_error(404, "Donation not found");
  }
  if ($donorID !== null && (int) $donation["DonorID"] !== (int) $donorID) {
    workflow_error(403, "You can only manage your own donations");
  }
  return $donation;
}

/**
 * @param int|string $needyID
 */
function verified_recipient($needyID)
{
  global $pdo;
  $stmt = $pdo->prepare(
    "SELECT np.UserID FROM needy_person np JOIN user u ON u.UserID = np.UserID WHERE np.NeedyID = ? AND np.VerificationStatus = 'Verified' AND u.Status = 'Active' FOR UPDATE",
  );
  $stmt->execute([$needyID]);
  $recipient = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$recipient) {
    workflow_error(403, "Recipient must be verified and active");
  }
  return $recipient;
}

/**
 * @param int|string $requestID
 */
function request_donation_id($requestID)
{
  global $pdo;
  $stmt = $pdo->prepare("SELECT DonationID FROM donation_request WHERE RequestID = ?");
  $stmt->execute([$requestID]);
  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$row) {
    workflow_error(404, "Request not found");
  }
  return $row["DonationID"];
}

// Donor accept aur admin assign mein yehi approval use hota hai.
// Transaction ke andar request aur donation dono update hote hain.
/**
 * @param int|string $requestID
 * @param int|string|null $donorID
 */
function approve_donation_request($requestID, $donorID = null)
{
  global $pdo;
  $donationID = request_donation_id($requestID);
  $donation = lock_donation($donationID, $donorID);
  $stmt = $pdo->prepare("SELECT * FROM donation_request WHERE RequestID = ? FOR UPDATE");
  $stmt->execute([$requestID]);
  $request = $stmt->fetch(PDO::FETCH_ASSOC);
  if (!$request || $request["Status"] !== "Pending") {
    workflow_error(409, "Request already handled. Please refresh");
  }
  if ($donation["Status"] !== "Available") {
    workflow_error(409, "Donation is no longer available");
  }
  $recipient = verified_recipient($request["NeedyID"]);
  $stmt = $pdo->prepare(
    "SELECT RequestID FROM donation_request WHERE DonationID = ? AND Status IN ('Accepted', 'Approved', 'Delivered') FOR UPDATE",
  );
  $stmt->execute([$donationID]);
  if ($stmt->fetch()) {
    workflow_error(409, "Donation already allocated to a recipient");
  }

  $stmt = $pdo->prepare(
    "UPDATE donation_request SET Status = 'Accepted', RespondedAt = NOW() WHERE RequestID = ?",
  );
  $stmt->execute([$requestID]);
  $stmt = $pdo->prepare("UPDATE donation SET Status = 'Approved' WHERE DonationID = ?");
  $stmt->execute([$donationID]);
  // Donation assign hone par baqi pending requests reject karo.
  $stmt = $pdo->prepare(
    "UPDATE donation_request SET Status = 'Rejected', RespondedAt = NOW() WHERE DonationID = ? AND RequestID <> ? AND Status = 'Pending'",
  );
  $stmt->execute([$donationID, $requestID]);
  $stmt = $pdo->prepare(
    "INSERT INTO notification (UserID, DonationID, Title, Message, Status, IsRead) VALUES (?, ?, 'Request Accepted', ?, 'Unread', 0)",
  );
  $stmt->execute([
    $recipient["UserID"],
    $donationID,
    "Your request for " . $donation["Title"] . " was accepted.",
  ]);
}
