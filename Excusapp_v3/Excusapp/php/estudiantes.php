<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

try {
    $tutores = $pdo->query(
        "SELECT t.id, t.documento, t.nombre_completo, t.email, t.telefono, t.aprobado,
                COUNT(e.id) AS estudiantes_count
         FROM tutores t
         LEFT JOIN estudiantes e ON e.tutor_id = t.id
         GROUP BY t.id, t.documento, t.nombre_completo, t.email, t.telefono, t.aprobado
         ORDER BY t.nombre_completo"
    )->fetchAll();

    $stmt = $pdo->query(
        "SELECT e.id AS estudiante_id, e.documento AS estudiante_documento,
                e.nombre_completo AS estudiante_nombre, e.grado,
                t.id AS tutor_id, t.documento AS tutor_documento,
                t.nombre_completo AS tutor_nombre, t.email AS tutor_email,
                t.telefono AS tutor_telefono, t.aprobado AS tutor_aprobado
         FROM estudiantes e
         INNER JOIN tutores t ON t.id = e.tutor_id
         ORDER BY e.nombre_completo"
    );

    $estudiantes = [];
    $baseInstitucional = [];
    foreach ($stmt->fetchAll() as $row) {
        $id = 'st-' . $row['estudiante_id'];
        $aprobado = (bool) $row['tutor_aprobado'];
        $estudiantes[] = [
            "id" => $id,
            "name" => $row['estudiante_nombre'],
            "grade" => $row['grado'],
            "documentId" => $row['estudiante_documento'],
            "tutorId" => 'tut-' . $row['tutor_id'],
            "tutorName" => $row['tutor_nombre'],
            "tutorEmail" => $row['tutor_email'],
            "tutorPhone" => $row['tutor_telefono'],
            "tutorApproved" => $aprobado
        ];
        $baseInstitucional[] = [
            "id" => $id,
            "studentDocument" => $row['estudiante_documento'],
            "studentName" => $row['estudiante_nombre'],
            "grade" => $row['grado'],
            "tutorDocument" => $row['tutor_documento'],
            "tutorName" => $row['tutor_nombre'],
            "tutorEmail" => $row['tutor_email'],
            "tutorApproved" => $aprobado
        ];
    }

    echo json_encode([
        "status" => "success",
        "tutores" => array_map(static function ($tutor) {
            return [
                "id" => (int) $tutor['id'],
                "documento" => $tutor['documento'],
                "nombre" => $tutor['nombre_completo'],
                "email" => $tutor['email'],
                "telefono" => $tutor['telefono'],
                "aprobado" => (bool) $tutor['aprobado'],
                "estudiantes_count" => (int) $tutor['estudiantes_count']
            ];
        }, $tutores),
        "students" => $estudiantes,
        "schoolDatabase" => $baseInstitucional
    ]);
} catch (PDOException $e) {
    error_log('Error consultando tutores y estudiantes: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "No fue posible consultar tutores y estudiantes."]);
}
?>
