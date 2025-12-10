<?php
session_start();

function require_auth() {
    if (!isset($_SESSION['user'])) {
        if (function_exists('return_json')) return_json(['error' => 'Unauthorized'], 401);
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
}

function require_role($role) {
    require_auth();
    if (!isset($_SESSION['user']['role']) || $_SESSION['user']['role'] !== $role) {
        if (function_exists('return_json')) return_json(['error' => 'Forbidden'], 403);
        header('Content-Type: application/json');
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden']);
        exit;
    }
}

?>
