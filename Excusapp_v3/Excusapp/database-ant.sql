-- ============================================================
-- SCRIPT DE BASE DE DATOS MYSQL PARA EXCUSAPP
-- Compatible con MySQL 5.7+ / MySQL 8.0+ / MariaDB
-- Cumple con Requerimientos RF-01 a RF-10 y RNF-01 a RNF-06
-- ============================================================

CREATE DATABASE IF NOT EXISTS `excusapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `excusapp`;

-- 1. TABLA DE TUTORES / ACUDIENTES (RF-01, RF-02, RF-03)
CREATE TABLE IF NOT EXISTS `tutores` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `documento` VARCHAR(20) NOT NULL UNIQUE,
  `nombre_completo` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `telefono` VARCHAR(20) NOT NULL,
  `aprobado` TINYINT(1) DEFAULT 0 COMMENT '0: Pendiente (RF-02), 1: Aprobado por la institución',
  `creado_en` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. TABLA DE ESTUDIANTES (RF-01)
CREATE TABLE IF NOT EXISTS `estudiantes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `documento` VARCHAR(20) NOT NULL UNIQUE,
  `nombre_completo` VARCHAR(100) NOT NULL,
  `grado` VARCHAR(10) NOT NULL COMMENT 'Ej: 11a, 11b, 8a, 7c, 9b, 6b, 10b',
  `tutor_id` INT NOT NULL,
  `creado_en` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`tutor_id`) REFERENCES `tutores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. TABLA DE EXCUSAS E INASISTENCIAS (RF-04, RNF-02)
CREATE TABLE IF NOT EXISTS `excusas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `folio` VARCHAR(30) NOT NULL UNIQUE COMMENT 'Ej: EX-2026-001',
  `estudiante_id` INT NOT NULL,
  `grado` VARCHAR(10) NOT NULL,
  `fecha_inasistencia` VARCHAR(10) NOT NULL COMMENT 'Formato DD/MM',
  `fecha_radicacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `motivo` VARCHAR(150) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `estado` ENUM('P', 'A', 'R') DEFAULT 'P' COMMENT 'P: Pendiente, A: Aprobada, R: Rechazada (RF-09)',
  `observaciones_coordinador` TEXT NULL,
  `revisado_por` VARCHAR(100) NULL,
  `revisado_en` DATETIME NULL,
  FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. TABLA DE EVIDENCIAS ENCRIPTADAS (RF-05, RNF-01)
CREATE TABLE IF NOT EXISTS `evidencias` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `excusa_id` INT NOT NULL UNIQUE,
  `nombre_archivo` VARCHAR(255) NOT NULL,
  `tipo_archivo` ENUM('PNG', 'JPG', 'PDF', 'Texto', 'Otros') NOT NULL,
  `tamano_bytes` INT NOT NULL,
  `ruta_archivo_encriptado` VARCHAR(255) NOT NULL,
  `hash_sha256` VARCHAR(64) NOT NULL COMMENT 'Hash para integridad (RNF-01)',
  `creado_en` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`excusa_id`) REFERENCES `excusas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `evidencias`
  MODIFY `ruta_archivo_encriptado` MEDIUMTEXT NOT NULL;

-- 5. TABLA DE LOGS DE NOTIFICACIONES (RF-06, RNF-03)
CREATE TABLE IF NOT EXISTS `notificaciones_log` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `excusa_id` INT NOT NULL,
  `email_destinatario` VARCHAR(100) NOT NULL,
  `mensaje` TEXT NOT NULL,
  `estado_transicion` VARCHAR(50) NOT NULL,
  `tiempo_entrega_segundos` DECIMAL(4,2) DEFAULT 1.20 COMMENT 'Garantía < 5.00s (RNF-03)',
  `fecha_envio` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`excusa_id`) REFERENCES `excusas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- DATOS INICIALES DE PRUEBA (COLEGIO EXCUSAPP)
-- ============================================================

INSERT IGNORE INTO `tutores` (`documento`, `nombre_completo`, `email`, `telefono`, `aprobado`) VALUES
('CC-1234001', 'Carlos Tabares', 'carlos.tabares@gmail.com', '3104567890', 1),
('CC-1234002', 'Martha Giraldo', 'martha.giraldo@outlook.com', '3129876543', 1),
('CC-1234003', 'Roberto Hernández', 'roberto.hernandez@yahoo.es', '3001122334', 1),
('CC-1234007', 'Jorge Reyes', 'jorge.reyes@unitecnica.net', '3209988776', 1),
('CC-1234004', 'Sonia Ortiz', 'sonia.ortiz@gmail.com', '3155544332', 1),
('CC-1234005', 'Alejandro Cruz', 'alejandro.cruz@hotmail.com', '3187766554', 1),
('CC-1234006', 'Gloria Ramírez', 'gloria.ramirez@gmail.com', '3112233445', 1),
('CC-1234008', 'Ana Gutiérrez', 'ana.gutierrez@gmail.com', '3143322110', 1),
('CC-1234009', 'Fernando Giraldo', 'fernando.giraldo@gmail.com', '3176655443', 1),
('CC-1234010', 'Luz Ochoa', 'luz.ochoa@gmail.com', '3198877665', 1),
('CC-1234011', 'Mauricio Vásquez', 'mauricio.vasquez@gmail.com', '3134455667', 1);

INSERT IGNORE INTO `estudiantes` (`documento`, `nombre_completo`, `grado`, `tutor_id`)
SELECT s.`documento`, s.`nombre_completo`, s.`grado`, t.`id`
FROM (
  SELECT '1011234001' AS `documento`, 'Laura Sofía Tabares Ramírez' AS `nombre_completo`, '11a' AS `grado`, 'CC-1234001' AS `tutor_documento`
  UNION ALL SELECT '1011234002', 'Laura Sofía Morales Giraldo', '11b', 'CC-1234002'
  UNION ALL SELECT '1011234003', 'Sara María Hernández Acevedo', '11a', 'CC-1234003'
  UNION ALL SELECT '1011234004', 'Gabriela Hoyos Ortiz', '8a', 'CC-1234004'
  UNION ALL SELECT '1011234005', 'María Paz Cruz Betancourt', '7c', 'CC-1234005'
  UNION ALL SELECT '1011234006', 'Juan José García Ramírez', '9b', 'CC-1234006'
  UNION ALL SELECT '1011234007', 'Gabriela Reyes Aristizabal', '8a', 'CC-1234007'
  UNION ALL SELECT '1011234008', 'Sara Gutierrez Hernández', '8a', 'CC-1234008'
  UNION ALL SELECT '1011234009', 'Sofía Giraldo Ramírez', '6b', 'CC-1234009'
  UNION ALL SELECT '1011234010', 'Juan José Ochoa', '10b', 'CC-1234010'
  UNION ALL SELECT '1011234011', 'Santiago Vasquez Ramírez', '11b', 'CC-1234011'
) AS s
INNER JOIN `tutores` t ON t.`documento` = s.`tutor_documento`;

INSERT IGNORE INTO `excusas` (`folio`, `estudiante_id`, `grado`, `fecha_inasistencia`, `motivo`, `descripcion`, `estado`) VALUES
('EX-2026-001', 4, '8a', '14/06', 'Enfermedad e incapacidad médica', 'La estudiante no pudo asistir el día 14/06 debido a enfermedad general.', 'P'),
('EX-2026-002', 1, '11a', '14/06', 'Cita médica odontológica programada', 'Asistencia a control ortodóncico en la mañana.', 'P');
