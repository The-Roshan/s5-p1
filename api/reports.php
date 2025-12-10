<?php
// Offline demo - reports endpoint (no database)
header('Content-Type: application/json');
session_start();

// Demo defaulters
$demoDefaulters = [
    ['student_id' => 2, 'name' => 'Jane Smith', 'roll_no' => 'CS002', 'attended' => 5, 'total' => 10],
    ['student_id' => 3, 'name' => 'Alice Johnson', 'roll_no' => 'CS003', 'attended' => 3, 'total' => 12],
];

$action = $_GET['action'] ?? '';

if ($action === 'defaulters') {
    echo json_encode($demoDefaulters);
    exit;
}

echo json_encode(['error' => 'Invalid report action']);

?>
