<?php
// Start output buffering to prevent accidental HTML output
ob_start();
ini_set('display_errors', '0');

// Convert PHP errors to JSON responses
set_error_handler(function($severity, $message, $file, $line) {
    while (ob_get_level()) ob_end_clean();
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $message]);
    exit;
});

// Fatal error handler
register_shutdown_function(function() {
    $err = error_get_last();
    if ($err) {
        while (ob_get_level()) ob_end_clean();
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(['error' => 'Fatal error: ' . ($err['message'] ?? 'Unknown')]);
        exit;
    }
});

$host = 'localhost';
$db = 'attendance_db';
$user = 'root';
$pass = '';

// Helper to return JSON and clear buffered output
function return_json($data, $code = 200) {
    while (ob_get_level()) ob_end_clean();
    header('Content-Type: application/json');
    http_response_code($code);
    echo json_encode($data);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    return_json(['error' => 'DB Connection failed: ' . $e->getMessage()], 500);
}

?>
