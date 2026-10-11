<?php

// KindReach FYP - Database Connection File

// 1. Allow React frontend to connect with backend

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; Charset=UTF-8");

// 2. Define database details

$host = 'localhost';                          // Server address
$dbname = 'kindreach_production_db';         // Database name
$username = 'root';                         // Default XAMPP username
$password = '';                            // Default XAMPP password (empty)

// 3. Connect to database using PDO

try {

    // 3. Connect to database using PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

    // 4. Set error mode to catch bugs easily
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 5. Success message
    echo json_encode(["status" => "success", "message" => "Database connected successfully!"]);
} catch (PDOException $e) {

    // 6. Handle connection error if something goes wrong
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $e->getMessage()]);
    exit();
}
?>