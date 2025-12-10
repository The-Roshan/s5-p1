<?php
// Offline demo - attendance sessions (no database)
header('Content-Type: application/json');
session_start();

// Demo sessions
$demoDessions = [
    ['session_id' => 1, 'allocation_id' => 1, 'date' => '2025-12-01', 'period_no' => 1],
    ['session_id' => 2, 'allocation_id' => 1, 'date' => '2025-12-08', 'period_no' => 2],
];

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET' && $action === 'list') {
    echo json_encode($demoDessions);
    exit;
}

if ($method === 'POST' && $action === 'save') {
    // In offline mode, just confirm receipt
    echo json_encode(['success' => true, 'saved' => 1, 'session_id' => time()]);
    exit;
}

echo json_encode(['error' => 'Invalid request']);

?>
