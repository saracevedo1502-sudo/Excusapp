<?php
// api/enviar_excusa.php - Radicación de excusa con encriptación RNF-01
require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "La solicitud no contiene datos JSON válidos."]);
    exit;
}

$estudiante_id = $input['estudiante_id'] ?? null;
$estudiante_documento = trim($input['estudiante_documento'] ?? '');
$grado = $input['grado'] ?? null;
$fecha = $input['fecha'] ?? null;
$motivo = $input['motivo'] ?? null;
$descripcion = $input['descripcion'] ?? null;

if (!$estudiante_id || !$motivo || !$descripcion) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Campos obligatorios incompletos"]);
    exit;
}

try {
    if ($estudiante_documento !== '') {
        $stmtEstudiante = $pdo->prepare("SELECT id FROM estudiantes WHERE documento = :documento LIMIT 1");
        $stmtEstudiante->execute([':documento' => $estudiante_documento]);
        $estudiante = $stmtEstudiante->fetch();
        if (!$estudiante) {
            http_response_code(422);
            echo json_encode(["status" => "error", "message" => "El estudiante seleccionado no está registrado en la base de datos."]);
            exit;
        }
        $estudiante_id = $estudiante['id'];
    } elseif (!ctype_digit((string) $estudiante_id)) {
        http_response_code(422);
        echo json_encode(["status" => "error", "message" => "No se pudo identificar al estudiante en la base de datos."]);
        exit;
    }

    $pdo->beginTransaction();

    // Generar Folio consecutivo
    $stmtCount = $pdo->query("SELECT COUNT(*) as total FROM excusas");
    $total = $stmtCount->fetch()['total'] + 1;
    $folio = "EX-" . date('Y') . "-" . str_pad($total, 3, "0", STR_PAD_LEFT);

    // Insertar Excusa
    $sql = "INSERT INTO excusas (folio, estudiante_id, grado, fecha_inasistencia, motivo, descripcion, estado) 
            VALUES (:folio, :estudiante_id, :grado, :fecha, :motivo, :descripcion, 'P')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':folio' => $folio,
        ':estudiante_id' => $estudiante_id,
        ':grado' => $grado,
        ':fecha' => $fecha,
        ':motivo' => $motivo,
        ':descripcion' => $descripcion
    ]);
    
    $excusa_id = $pdo->lastInsertId();

    // Manejo y Encriptación AES de Evidencias (RNF-01)
    if (!empty($input['evidencia_base64'])) {
        $evidencia = $input['evidencia_base64'];
        if (preg_match('/^data:[^;,]+;base64,(.*)$/s', $evidencia, $coincidencias)) {
            $evidencia = $coincidencias[1];
        }
        $raw_data = base64_decode($evidencia, true);
        if ($raw_data === false || $raw_data === '') {
            throw new InvalidArgumentException("La evidencia adjunta no tiene un formato Base64 válido.");
        }

        $key = "EXCUSAPP_SECRET_KEY_2026";
        $iv = random_bytes(openssl_cipher_iv_length('aes-256-cbc'));
        $encrypted = openssl_encrypt($raw_data, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
        if ($encrypted === false) {
            throw new RuntimeException("No fue posible cifrar la evidencia adjunta.");
        }

        $hash = hash('sha256', $raw_data);
        $tipo_archivo = strtoupper(pathinfo($input['nombre_archivo'] ?? '', PATHINFO_EXTENSION));
        if ($tipo_archivo === 'JPEG') {
            $tipo_archivo = 'JPG';
        } elseif ($tipo_archivo === 'TXT') {
            $tipo_archivo = 'Texto';
        }
        if (!in_array($tipo_archivo, ['PNG', 'JPG', 'PDF', 'Texto'], true)) {
            $tipo_archivo = 'Otros';
        }

        $sqlEvidencia = "INSERT INTO evidencias (excusa_id, nombre_archivo, tipo_archivo, tamano_bytes, ruta_archivo_encriptado, hash_sha256) 
                         VALUES (:excusa_id, :nombre, :tipo, :tamano, :ruta, :hash)";
        $stmtEv = $pdo->prepare($sqlEvidencia);
        $stmtEv->execute([
            ':excusa_id' => $excusa_id,
            ':nombre' => $input['nombre_archivo'] ?? 'Evidencia.pdf',
            ':tipo' => $tipo_archivo,
            ':tamano' => strlen($raw_data),
            ':ruta' => base64_encode($iv . $encrypted),
            ':hash' => $hash
        ]);
    }

    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Excusa radicada con éxito",
        "folio" => $folio
    ]);

} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    error_log('Error radicando excusa: ' . $e->getMessage());
    echo json_encode(["status" => "error", "message" => "No fue posible guardar la excusa y su evidencia."]);
}
?>
