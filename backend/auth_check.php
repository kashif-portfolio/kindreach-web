<?php
// Frontend runs on Vite; PHP runs on XAMPP. Cookies need a specific origin.
$allowedOrigins = [
    'http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173',
    'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:4173',
    'http://localhost', 'http://127.0.0.1',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
header('Content-Type: application/json; charset=UTF-8');
header('Vary: Origin');

if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Origin not allowed']);
    exit();
}
if ($origin !== '') {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Browser keeps only the session cookie. Actual user ID stays on the server.
session_name('kindreach_session');
session_set_cookie_params([
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
]);
session_start();

function auth_error($status, $message) {
    http_response_code($status);
    echo json_encode(['status' => 'error', 'message' => $message]);
    exit();
}

// Call this at the start of each protected API.
// Example: require_login(['Admin']) allows only the admin role.
function require_login($allowedRoles = []) {
    global $pdo;
    if (empty($_SESSION['userID'])) {
        auth_error(401, 'Please login first');
    }

    // Read role and status again so a blocked account loses access immediately.
    $stmt = $pdo->prepare("
        SELECT u.UserID AS userID, u.Name AS name, u.Email AS email,
               u.Phone AS phone, u.Address AS address, u.Status AS status,
               r.RoleName AS role, d.DonorID AS donorID, n.NeedyID AS needyID
        FROM user u
        JOIN role r ON u.RoleID = r.RoleID
        LEFT JOIN donor d ON d.UserID = u.UserID
        LEFT JOIN needy_person n ON n.UserID = u.UserID
        WHERE u.UserID = ?
    ");
    $stmt->execute([$_SESSION['userID']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user || $user['status'] !== 'Active') {
        $_SESSION = [];
        auth_error(401, 'Account unavailable. Please login again');
    }
    if ($allowedRoles && !in_array($user['role'], $allowedRoles, true)) {
        auth_error(403, 'You do not have permission for this action');
    }
    return $user;
}

// A browser-supplied ID must match the logged-in user's real ID.
function require_own_id($submittedID, $sessionID) {
    if ((int)$sessionID <= 0 || (int)$submittedID !== (int)$sessionID) {
        auth_error(403, 'You can only access your own records');
    }
}

// Accept, decline and delivery APIs receive RequestID, so check its donor too.
function require_donor_request($requestID, $donorID) {
    global $pdo;
    $stmt = $pdo->prepare("
        SELECT dr.RequestID FROM donation_request dr
        JOIN donation d ON d.DonationID = dr.DonationID
        WHERE dr.RequestID = ? AND d.DonorID = ?
    ");
    $stmt->execute([$requestID, $donorID]);
    if (!$stmt->fetch()) {
        auth_error(403, 'This request does not belong to your donations');
    }
}
