<?php
// ============================================
// KindReach - Register API
// ============================================

// 1. Database connection file include karo
require_once '../db_connect.php';

// 2. Sirf POST method allow karo
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "status" => "error",
        "message" => "Only POST method is allowed"
    ]);
    exit();
}

// 3. Frontend se aaya hua JSON data lo
$data = json_decode(file_get_contents("php://input"), true);

// 4. Required fields check karo
if (
    empty($data['name']) ||
    empty($data['email']) ||
    empty($data['password']) ||
    empty($data['phone']) ||
    empty($data['role'])      // "Donor" ya "Needy"
) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Name, email, password, phone and role are required"
    ]);
    exit();
}

// 5. Data variables mein store karo
$name     = trim($data['name']);
$email    = trim($data['email']);
$password = $data['password'];
$phone    = trim($data['phone']);
$address  = isset($data['address']) ? trim($data['address']) : '';
$roleName = trim($data['role']); // "Donor" or "Needy"

// Extra fields (optional)
$cnic         = isset($data['cnic']) ? trim($data['cnic']) : null;
$organization = isset($data['organization']) ? trim($data['organization']) : null;
$incomeStatus = isset($data['incomeStatus']) ? trim($data['incomeStatus']) : null;
$familyDetails = isset($data['familyDetails']) ? trim($data['familyDetails']) : null;

// 6. Email format check
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email format"
    ]);
    exit();
}

// 7. Password length check
if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Password must be at least 6 characters"
    ]);
    exit();
}

try {
    // 8. Check karo email pehle se to nahi hai
    $stmt = $pdo->prepare("SELECT UserID FROM user WHERE Email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        http_response_code(409); // Conflict
        echo json_encode([
            "status" => "error",
            "message" => "Email already registered"
        ]);
        exit();
    }

    // 9. RoleID nikaalo (Donor = 2, Needy = 3)
    $stmt = $pdo->prepare("SELECT RoleID FROM role WHERE RoleName = ?");
    $stmt->execute([$roleName]);
    $role = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$role) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Invalid role. Use Donor or Needy"
        ]);
        exit();
    }

    $roleID = $role['RoleID'];

    // 10. Password hash karo (security)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // 11. Transaction start (agar beech mein error aaye to rollback)
    $pdo->beginTransaction();

    // 12. user table mein insert
    $stmt = $pdo->prepare("
        INSERT INTO user (RoleID, Name, Email, Password, Phone, Address, Status)
        VALUES (?, ?, ?, ?, ?, ?, 'Active')
    ");
    $stmt->execute([$roleID, $name, $email, $hashedPassword, $phone, $address]);

    // 13. Naya UserID lo
    $userID = $pdo->lastInsertId();

    // 14. Agar Donor hai to donor table mein bhi entry
    if ($roleName === 'Donor') {
        $stmt = $pdo->prepare("
            INSERT INTO donor (UserID, Organization, CNIC, Description, PreferredContact)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $userID,
            $organization,           // null ho sakta hai
            $cnic ?? '',
            $data['description'] ?? '',
            $data['preferredContact'] ?? $phone
        ]);
    }

    // 15. Agar Needy hai to needy_person table mein entry
    if ($roleName === 'Needy') {
        $stmt = $pdo->prepare("
            INSERT INTO needy_person (UserID, CNIC, IncomeStatus, FamilyDetails, AddressDetails, VerificationStatus)
            VALUES (?, ?, ?, ?, ?, 'Pending')
        ");
        $stmt->execute([
            $userID,
            $cnic,
            $incomeStatus,
            $familyDetails,
            $address
        ]);
    }

    // 16. Sab theek hai to commit
    $pdo->commit();

    // 17. Success response
    http_response_code(201); // Created
    echo json_encode([
        "status" => "success",
        "message" => "Registration successful",
        "data" => [
            "userID" => $userID,
            "name"   => $name,
            "email"  => $email,
            "role"   => $roleName
        ]
    ]);

} catch (PDOException $e) {
    // Error aaye to rollback
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Registration failed: " . $e->getMessage()
    ]);
}