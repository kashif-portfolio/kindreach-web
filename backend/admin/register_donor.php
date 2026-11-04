<?php
// Sirf logged-in admin donor register kar sakta hai.
require_once '../db_connect.php';
require_login(['Admin']);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    auth_error(405, 'Only POST allowed');
}

// Form se aayi values lo aur check karo.
$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    auth_error(400, 'Invalid form data');
}
foreach (['name', 'email', 'phone', 'location', 'cnic', 'organization', 'password'] as $field) {
    if (isset($data[$field]) && !is_string($data[$field])) {
        auth_error(400, 'Invalid form data');
    }
}
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$address = trim($data['location'] ?? '');
$cnic = trim($data['cnic'] ?? '');
$organization = trim($data['organization'] ?? '');
$password = $data['password'] ?? '';
if ($name === '' || $phone === '' || $address === '' || $cnic === '') {
    auth_error(400, 'Please enter name, valid email, phone, address and CNIC');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    auth_error(400, 'Please enter a valid email address');
}

if (strlen($password) < 6 || strlen($password) > 128 || trim($password) === '') {
    auth_error(400, 'Password must be 6 to 128 characters');
}
if (strlen($name) > 100 || strlen($email) > 100 || strlen($phone) > 20 || strlen($address) > 255 || strlen($cnic) > 20 || strlen($organization) > 100) {
    auth_error(400, 'One or more fields are too long');
}

try {
    $stmt = $pdo->prepare('SELECT UserID FROM user WHERE Email = ?');
    $stmt->execute([$email]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($existingUser) {
        auth_error(409, 'Email already registered');
    }

    // Frontend se role nahi lete; yeh API sirf Donor banati hai.
    $stmt = $pdo->prepare("SELECT RoleID FROM role WHERE RoleName = 'Donor'");
    $stmt->execute();
    $role = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$role) {
        auth_error(500, 'Donor role not configured');
    }

    // Dono records saath save honge. Error par dono undo ho jayenge.
    $pdo->beginTransaction();
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("
        INSERT INTO user (RoleID, Name, Email, Password, Phone, Address, Status)
        VALUES (?, ?, ?, ?, ?, ?, 'Active')
    ");
    $stmt->execute([
        $role['RoleID'],
        $name,
        $email,
        $hashedPassword,
        $phone,
        $address,
    ]);
    $userID = $pdo->lastInsertId();
    // Organization optional hai. Khali ho to database mein NULL save karein.
    if ($organization === '') {
        $organization = null;
    }

    $stmt = $pdo->prepare('
        INSERT INTO donor (UserID, Organization, CNIC, Description, PreferredContact)
        VALUES (?, ?, ?, ?, ?)
    ');
    $stmt->execute([$userID, $organization, $cnic, '', $phone]);
    $donorID = $pdo->lastInsertId();
    $pdo->commit();
    http_response_code(201);
    echo json_encode([
        'status' => 'success',
        'message' => 'Donor registered successfully',
        'data' => [
            'userID' => $userID,
            'donorID' => $donorID,
        ],
    ]);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    if (($e->errorInfo[1] ?? 0) == 1062) {
        auth_error(409, 'Email or CNIC already registered');
    }
    auth_error(500, 'Could not register donor. Please try again');
}

