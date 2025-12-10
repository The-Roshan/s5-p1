<?php
// Demo - just show credentials
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'msg' => 'Offline demo mode - use credentials below:',
    'credentials' => [
        ['username' => 'admin', 'password' => 'admin', 'role' => 'admin'],
        ['username' => 'faculty1', 'password' => 'faculty', 'role' => 'faculty'],
        ['username' => 'student1', 'password' => 'student', 'role' => 'student'],
    ]
]);
?>
