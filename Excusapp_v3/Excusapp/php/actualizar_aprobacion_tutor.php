<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$tutorId = filter_var($input['tutor_id'] ?? null, FILTER_VALIDATE_INT);
$aprobado = $input['aprobado'] ?? null;

if (!$tutorId || !in_array($aprobado, [0, 1, '0', '1', false, true], true)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Tutor o estado de aprobación inválido."]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE tutores SET aprobado = :aprobado WHERE id = :id");
    $stmt->execute([
        ':aprobado' => (int) $aprobado,
        ':id' => $tutorId
    ]);

    if ($stmt->rowCount() === 0) {
        $check = $pdo->prepare("SELECT id FROM tutores WHERE id = :id");
        $check->execute([':id' => $tutorId]);
        if (!$check->fetch()) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Tutor no encontrado."]);
            exit;
        }
    }

    echo json_encode([
        "status" => "success",
        "message" => "Estado del tutor actualizado.",
        "aprobado" => (bool) $aprobado
    ]);
} catch (PDOException $e) {
    error_log('Error actualizando aprobación del tutor: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "No fue posible actualizar la aprobación."]);
}
?>
