<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$tutor = $input['tutor'] ?? [];
$estudiantes = $input['estudiantes'] ?? [];

if (!is_array($tutor) || !is_array($estudiantes)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Los datos del tutor y estudiantes no son válidos."]);
    exit;
}

$documento = trim($tutor['documento'] ?? '');
$nombre = trim($tutor['nombre_completo'] ?? '');
$email = trim($tutor['email'] ?? '');
$telefono = trim($tutor['telefono'] ?? '');

if ($documento === '' || $nombre === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $telefono === '') {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Documento, nombre, correo válido y teléfono del tutor son obligatorios."]);
    exit;
}

$estudiantesValidados = [];
foreach ($estudiantes as $estudiante) {
    if (!is_array($estudiante)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Los datos de los estudiantes no son válidos."]);
        exit;
    }

    $estudianteDocumento = trim($estudiante['documento'] ?? '');
    $estudianteNombre = trim($estudiante['nombre_completo'] ?? '');
    $grado = trim($estudiante['grado'] ?? '');

    if ($estudianteDocumento === '' || $estudianteNombre === '' || $grado === '') {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Documento, nombre y grado son obligatorios para cada estudiante."]);
        exit;
    }

    $estudiantesValidados[] = [
        "documento" => $estudianteDocumento,
        "nombre_completo" => $estudianteNombre,
        "grado" => $grado
    ];
}

try {
    $pdo->beginTransaction();

    $stmtTutor = $pdo->prepare(
        "INSERT INTO tutores (documento, nombre_completo, email, telefono, aprobado)
         VALUES (:documento, :nombre, :email, :telefono, 0)"
    );
    $stmtTutor->execute([
        ':documento' => $documento,
        ':nombre' => $nombre,
        ':email' => $email,
        ':telefono' => $telefono
    ]);
    $tutorId = (int) $pdo->lastInsertId();

    $stmtEstudiante = $pdo->prepare(
        "INSERT INTO estudiantes (documento, nombre_completo, grado, tutor_id)
         VALUES (:documento, :nombre, :grado, :tutor_id)"
    );
    foreach ($estudiantesValidados as $estudiante) {
        $stmtEstudiante->execute([
            ':documento' => $estudiante['documento'],
            ':nombre' => $estudiante['nombre_completo'],
            ':grado' => $estudiante['grado'],
            ':tutor_id' => $tutorId
        ]);
    }

    $pdo->commit();
    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => count($estudiantesValidados) > 0
            ? "Tutor y estudiantes registrados. La cuenta del tutor queda pendiente de aprobación."
            : "Tutor registrado. La cuenta queda pendiente de aprobación y ya puede asociarle estudiantes.",
        "tutor_id" => $tutorId,
        "estudiantes_registrados" => count($estudiantesValidados)
    ]);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    if ($e->getCode() === '23000') {
        http_response_code(409);
        echo json_encode(["status" => "error", "message" => "El documento o correo del tutor, o el documento de un estudiante, ya está registrado."]);
        exit;
    }

    error_log('Error registrando tutor y estudiantes: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "No fue posible registrar el tutor y sus estudiantes."]);
}
?>
