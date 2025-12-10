<?php
// Simple health endpoint - no database needed
header('Content-Type: application/json');
echo json_encode(['success' => true, 'msg' => 'pong', 'mode' => 'offline-demo']);
?>
