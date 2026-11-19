<?php
// config.php - Conexión PDO a MySQL para ExcusApp
$host = 'localhost';
$dbname = 'excusapp';
$username = 'root';
$password = ''; // En producción asignar clave segura

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    die(json_encode(["status" => "error", "message" => "Error de conexión: " . $e->getMessage()]));
}
?>
