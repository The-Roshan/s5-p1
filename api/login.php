<?php
// Simplified login without database - demo credentials only
header('Content-Type: application/json');
ob_start();

// Demo credentials (no database needed)
$validUsers = [
    ['username' => 'admin', 'password' => 'admin', 'role' => 'admin', 'id' => 1],
    ['username' => 'faculty1', 'password' => 'faculty', 'role' => 'faculty', 'id' => 2],
    ['username' => 'student1', 'password' => 'student', 'role' => 'student', 'id' => 3],
];

session_start();

$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';
$role = $input['role'] ?? '';

if (empty($username) || empty($password) || empty($role)) {
    while (ob_get_level()) ob_end_clean();
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

$user = null;
foreach ($validUsers as $u) {
    if ($u['username'] === $username && $u['password'] === $password && $u['role'] === $role) {
        $user = $u;
        break;
    }
}

if ($user) {
    $_SESSION['user'] = ['id' => $user['id'], 'username' => $user['username'], 'role' => $user['role']];
    while (ob_get_level()) ob_end_clean();
    http_response_code(200);
    echo json_encode(['success' => true, 'user' => $_SESSION['user']]);
} else {
    while (ob_get_level()) ob_end_clean();
    http_response_code(401);
    echo json_encode(['error' => 'Invalid username, password, or role']);
}

?>
