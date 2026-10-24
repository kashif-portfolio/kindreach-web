<?php
// ============================================
// KindReach - Login API
// ============================================

require_once '../db_connect.php';

// Sirf POST method allow
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Only POST method is allowed"
    ]);
    exit();
}

// Frontend se JSON data lo
$data = json_decode(file_get_contents("php://input"), true);

// Required fields check
if (empty($data['email']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Email and password are required"
    ]);
    exit();
}

$email    = trim($data['email']);
$password = $data['password'];

try {
    // 1. User ko email se dhoondho + role bhi lo
    $stmt = $pdo->prepare("
        SELECT 
            u.UserID,
            u.Name,
            u.Email,
            u.Password,
            u.Phone,
            u.Address,
            u.Status,
            r.RoleName
        FROM user u
        JOIN role r ON u.RoleID = r.RoleID
        WHERE u.Email = ?
    ");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // 2. Agar user nahi mila
    if (!$user) {
        http_response_code(401); // Unauthorized
        echo json_encode([
            "status" => "error",
            "message" => "Invalid email or password"
        ]);
        exit();
    }

    // 3. Account active hai ya nahi
    if ($user['Status'] !== 'Active') {
        http_response_code(403); // Forbidden
        echo json_encode([
            "status" => "error",
            "message" => "Your account is not active. Contact admin."
        ]);
        exit();
    }

    // 4. Password verify karo
    if (!password_verify($password, $user['Password'])) {
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => "Invalid email or password"
        ]);
        exit();
    }

    // 5. Password response mein mat bhejo (security)
    unset($user['Password']);

    // 6. Success response
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Login successful",
        "data" => [
            "userID"  => $user['UserID'],
            "name"    => $user['Name'],
            "email"   => $user['Email'],
            "phone"   => $user['Phone'],
            "address" => $user['Address'],
            "role"    => $user['RoleName'],
            "status"  => $user['Status']
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Login failed: " . $e->getMessage()
    ]);
}