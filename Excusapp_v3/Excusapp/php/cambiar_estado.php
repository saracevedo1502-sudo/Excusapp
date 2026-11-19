<?php
// api/cambiar_estado.php - Aprobar (A), Rechazar (R) o Pendiente (P) - RF-09
require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$excusa_id = $input['excusa_id'] ?? null;
$estado = $input['estado'] ?? null; // 'A', 'R', 'P'
$observaciones = $input['observaciones'] ?? '';

if (!$excusa_id || !in_array($estado, ['A', 'R', 'P'])) {
    echo json_encode(["status" => "error", "message" => "Estado o ID inválido"]);
    exit;
}

try {
    $sql = "UPDATE excusas 
            SET estado = :estado, observaciones_coordinador = :obs, revisado_por = 'Coordinación', revisado_en = NOW() 
            WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':estado' => $estado,
        ':obs' => $observaciones,
        ':id' => $excusa_id
    ]);

    echo json_encode(["status" => "success", "message" => "Estado de la excusa actualizado"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
