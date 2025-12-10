<?php
// Offline demo - returns sample student data from session/demo
header('Content-Type: application/json');
session_start();

// Demo students data (no database)
$demoStudents = [
    ['student_id' => 1, 'roll_no' => 'CS001', 'name' => 'John Doe', 'department_id' => 1, 'course_id' => 1, 'semester' => 1, 'section' => 'A', 'email' => 'john@college.edu'],
    ['student_id' => 2, 'roll_no' => 'CS002', 'name' => 'Jane Smith', 'department_id' => 1, 'course_id' => 1, 'semester' => 1, 'section' => 'A', 'email' => 'jane@college.edu'],
    ['student_id' => 3, 'roll_no' => 'CS003', 'name' => 'Alice Johnson', 'department_id' => 1, 'course_id' => 1, 'semester' => 1, 'section' => 'A', 'email' => 'alice@college.edu'],
];

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET' && $action === 'get_students') {
    echo json_encode($demoStudents);
    exit;
}

if ($method === 'GET' && $action === 'list') {
    echo json_encode($demoStudents);
    exit;
}

echo json_encode(['error' => 'Invalid request']);

?>
