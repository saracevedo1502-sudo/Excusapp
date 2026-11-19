<?php
// api/login.php - Módulo de Autenticación / Login para ExcusApp
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$email = trim($input['email'] ?? '');
$password = trim($input['password'] ?? '');
$role = trim($input['role'] ?? 'acudiente'); // 'acudiente', 'coordinador', 'admin'

if (empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Correo y contraseña son obligatorios"]);
    exit;
}

try {
    // Si el rol es coordinador o admin
    if ($role === 'coordinador' || $role === 'admin') {
        if ($email === 'coordinacion@colegio.edu.co' && $password === 'coord2026') {
            echo json_encode([
                "status" => "success",
                "message" => "Inicio de sesión exitoso como Coordinación",
                "user" => [
                    "id" => "coord-01",
                    "nombre" => "Coordinación Académica",
                    "email" => $email,
                    "role" => $role,
                    "token" => bin2hex(random_bytes(16))
                ]
            ]);
            exit;
        }
    }

    // Buscar en la tabla de tutores/acudientes en MySQL (RF-01, RF-02)
    $stmt = $pdo->prepare("SELECT * FROM tutores WHERE email = :email LIMIT 1");
    $stmt->execute([':email' => $email]);
    $tutor = $stmt->fetch();

    if ($tutor) {
        if ($tutor['aprobado'] == 0) {
            echo json_encode([
                "status" => "error",
                "message" => "Su cuenta de acudiente aún no ha sido aprobada por la institución escolar (RF-02)."
            ]);
            exit;
        }

        echo json_encode([
            "status" => "success",
            "message" => "Inicio de sesión exitoso como Acudiente",
            "user" => [
                "id" => (string)$tutor['id'],
                "nombre" => $tutor['nombre_completo'],
                "email" => $tutor['email'],
                "documento" => $tutor['documento'],
                "role" => "acudiente",
                "token" => bin2hex(random_bytes(16))
            ]
        ]);
        exit;
    }

    // Si no coincide con ninguno
    echo json_encode([
        "status" => "error",
        "message" => "Credenciales inválidas o correo no registrado en la institución."
    ]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Error en servidor: " . $e->getMessage()]);
}
?>
