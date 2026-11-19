<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$documento = trim($input['documento'] ?? '');
$nombre = trim($input['nombre_completo'] ?? '');
$grado = trim($input['grado'] ?? '');
$tutorId = filter_var($input['tutor_id'] ?? null, FILTER_VALIDATE_INT);

if ($documento === '' || $nombre === '' || $grado === '' || !$tutorId) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Documento, nombre, grado y tutor son obligatorios."]);
    exit;
}

try {
    $stmtTutor = $pdo->prepare("SELECT id FROM tutores WHERE id = :id LIMIT 1");
    $stmtTutor->execute([':id' => $tutorId]);
    if (!$stmtTutor->fetch()) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "El tutor seleccionado no está registrado."]);
        exit;
    }

    // Si el estudiante ya está en la lista institucional, solo se le asigna el acudiente
    $stmtExiste = $pdo->prepare("SELECT id, tutor_id FROM estudiantes WHERE documento = :documento LIMIT 1");
    $stmtExiste->execute([':documento' => $documento]);
    $existente = $stmtExiste->fetch();
    if ($existente) {
        if ($existente['tutor_id'] !== null) {
            http_response_code(409);
            echo json_encode(["status" => "error", "message" => "Este estudiante ya tiene un acudiente asignado."]);
            exit;
        }
        $stmtAsignar = $pdo->prepare("UPDATE estudiantes SET tutor_id = :tutor_id WHERE id = :id");
        $stmtAsignar->execute([':tutor_id' => $tutorId, ':id' => $existente['id']]);
        echo json_encode(["status" => "success", "message" => "Estudiante vinculado al acudiente correctamente.", "estudiante_id" => (int) $existente['id']]);
        exit;
    }

    $stmt = $pdo->prepare(
        "INSERT INTO estudiantes (documento, nombre_completo, grado, tutor_id)
         VALUES (:documento, :nombre, :grado, :tutor_id)"
    );
    $stmt->execute([
        ':documento' => $documento,
        ':nombre' => $nombre,
        ':grado' => $grado,
        ':tutor_id' => $tutorId
    ]);

    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Estudiante registrado correctamente.",
        "estudiante_id" => (int) $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') {
        http_response_code(409);
        echo json_encode(["status" => "error", "message" => "Ya existe un estudiante con ese documento."]);
        exit;
    }

    error_log('Error registrando estudiante: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "No fue posible registrar el estudiante."]);
}
?>
