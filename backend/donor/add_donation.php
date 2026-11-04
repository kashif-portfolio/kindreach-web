<?php

// Nayi donation save karo.
require_once "../db_connect.php";

$currentUser = require_login(["Donor"]);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["status" => "error", "message" => "Only POST method is allowed"]);
  exit();
}

// Frontend se aaya data
$data = json_decode(file_get_contents("php://input"), true);

require_own_id($data["donorID"] ?? 0, $currentUser["donorID"]);

// Zaroori fields
if (
  empty($data["donorID"]) ||
  empty($data["typeID"]) ||
  empty($data["title"]) ||
  empty($data["quantity"])
) {
  http_response_code(400);
  echo json_encode([
    "status" => "error",
    "message" => "donorID, typeID, title and quantity are required",
  ]);
  exit();
}

$donorID = (int) $data["donorID"];
$typeID = (int) $data["typeID"];
$title = trim($data["title"]);
$description = isset($data["description"]) ? trim($data["description"]) : null;
$quantity = (int) $data["quantity"];
$location = isset($data["location"]) ? trim($data["location"]) : null;
$urgencyLevel = $data["urgencyLevel"] ?? "Normal";

// Sirf dropdown ki teen valid urgency values save karein.
if (!in_array($urgencyLevel, ["Normal", "Priority", "Urgent"], true)) {
  auth_error(400, "Please select Normal, Priority or Urgent");
}

// Database ka kaam
try {
  // Donor ka record check karo.
  $stmt = $pdo->prepare("SELECT DonorID FROM donor WHERE DonorID = ?");
  $stmt->execute([$donorID]);
  if ($stmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(["status" => "error", "message" => "Donor not found"]);
    exit();
  }

  // Donation save karo.
  $stmt = $pdo->prepare("
        INSERT INTO donation (DonorID, TypeID, Title, Description, Quantity, Location, UrgencyLevel, Status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'Available')
    ");
  $stmt->execute([$donorID, $typeID, $title, $description, $quantity, $location, $urgencyLevel]);

  $donationID = $pdo->lastInsertId();

  http_response_code(201);
  echo json_encode([
    "status" => "success",
    "message" => "Donation added successfully",
    "data" => [
      "donationID" => $donationID,
      "title" => $title,
      "quantity" => $quantity,
      "status" => "Available",
      "urgencyLevel" => $urgencyLevel,
    ],
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => "Failed to add donation: " . $e->getMessage(),
  ]);
}
