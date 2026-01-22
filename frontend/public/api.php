<?php
header('Content-Type: application/json');

// Permitir CORS en desarrollo
header("Access-Control-Allow-Origin: *");

$action = $_GET['action'] ?? '';

if ($action === 'health') {
    echo json_encode([
        'status' => 'ok',
        'message' => 'Servidor MPP activo',
        'timestamp' => date('c'),
        'php_version' => PHP_VERSION
    ]);
    exit;
}

echo json_encode(['error' => 'Acción no válida']);
