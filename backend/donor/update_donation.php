<?php

// Apni available donation edit karo.
require_once "../db_connect.php";

$currentUser = require_login(["Donor"]);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  auth_error(405, "Only POST allowed");
}

// Frontend se aaya data
$data = json_decode(file_get_contents("php://input"), true);
if (!is_array($data)) {
  auth_error(400, "Please send valid donation details");
}

$donationID = filter_var($data["donationID"] ?? null, FILTER_VALIDATE_INT, [
  "options" => ["min_range" => 1],
]);
$typeID = filter_var($data["typeID"] ?? null, FILTER_VALIDATE_INT, [
  "options" => ["min_range" => 1],
]);
$quantity = filter_var($data["quantity"] ?? null, FILTER_VALIDATE_INT, [
  "options" => ["min_range" => 1, "max_range" => 2147483647],
]);
$title = is_string($data["title"] ?? null) ? trim($data["title"]) : "";
$description = is_string($data["description"] ?? null) ? trim($data["description"]) : "";
$location = is_string($data["location"] ?? null) ? trim($data["location"]) : "";

$urgencyLevel = $data["urgencyLevel"] ?? "Normal";

// Sirf dropdown ki teen valid urgency values save karein.
if (!in_array($urgencyLevel, ["Normal", "Priority", "Urgent"], true)) {
  auth_error(400, "Please select Normal, Priority or Urgent");
}

if (
  !$donationID ||
  !$typeID ||
  !$quantity ||
  $title === "" ||
  $description === "" ||
  $location === ""
) {
  auth_error(
    400,
    "Title, description, category, positive whole-number quantity and location are required",
  );
}
if (mb_strlen($title, "UTF-8") > 100 || mb_strlen($location, "UTF-8") > 255) {
  auth_error(400, "Title must be at most 100 characters and location at most 255 characters");
}

// Database ka kaam
try {
  $pdo->beginTransaction();

  // Edit ke dauran donation lock karke owner aur status check karo.
  $stmt = $pdo->prepare("SELECT DonorID, Status FROM donation WHERE DonationID = ? FOR UPDATE");
  $stmt->execute([$donationID]);
  $donation = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$donation) {
    $pdo->rollBack();
    auth_error(404, "Donation not found");
  }
  if ((int) $donation["DonorID"] !== (int) $currentUser["donorID"]) {
    $pdo->rollBack();
    auth_error(403, "You can only edit your own donations");
  }
  if ($donation["Status"] !== "Available") {
    $pdo->rollBack();
    auth_error(409, "Only available donations can be edited. Please refresh the list");
  }

  // Category ki asal ID database se lo.
  $stmt = $pdo->prepare("SELECT TypeID FROM donation_type WHERE TypeID = ?");
  $stmt->execute([$typeID]);
  if (!$stmt->fetch()) {
    $pdo->rollBack();
    auth_error(400, "Please select an existing donation category");
  }

  $stmt = $pdo->prepare(
    'UPDATE donation SET Title = ?, Description = ?, TypeID = ?, Quantity = ?, Location = ?, UrgencyLevel = ? WHERE DonationID = ? AND DonorID = ? AND Status = \'Available\'',
  );
  $stmt->execute([
    $title,
    $description,
    $typeID,
    $quantity,
    $location,
    $urgencyLevel,
    $donationID,
    $currentUser["donorID"],
  ]);

  // Save hua data wapas bhejo taake table update ho.
  $stmt = $pdo->prepare("
        SELECT d.DonationID AS id, d.Title AS title, d.Description AS description,
               d.TypeID AS typeID, dt.TypeName AS category, d.Quantity AS quantity,
               d.Location AS location, d.UrgencyLevel AS urgencyLevel, d.Status AS status, DATE(d.CreatedAt) AS date
        FROM donation d JOIN donation_type dt ON dt.TypeID = d.TypeID
        WHERE d.DonationID = ?
    ");
  $stmt->execute([$donationID]);
  $updatedDonation = $stmt->fetch(PDO::FETCH_ASSOC);
  $pdo->commit();

  echo json_encode([
    "status" => "success",
    "message" => "Donation updated successfully",
    "data" => $updatedDonation,
  ]);
} catch (PDOException $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => "Could not update donation. Please try again",
  ]);
}
