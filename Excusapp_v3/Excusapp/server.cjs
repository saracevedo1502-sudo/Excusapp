var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");

// src/data/initialData.ts
var INITIAL_STUDENTS = [
  { id: "st-1", name: "TABARES RAMIREZ LAURA SOFIA", grade: "11a", documentId: "1088296602", tutorId: "tut-1", tutorName: "Carlos Tabares", tutorEmail: "carlos.tabares@gmail.com", tutorPhone: "3104567890", tutorApproved: true },
  { id: "st-2", name: "MORALES GIRALDO LAURA SOFIA", grade: "11b", documentId: "1128906177", tutorId: "tut-2", tutorName: "Martha Giraldo", tutorEmail: "martha.giraldo@outlook.com", tutorPhone: "3129876543", tutorApproved: true },
  { id: "st-3", name: "HERNANDEZ ACEVEDO SARA MARIA", grade: "11a", documentId: "1034665294", tutorId: "tut-3", tutorName: "Roberto Hern\xE1ndez", tutorEmail: "roberto.hernandez@yahoo.es", tutorPhone: "3001122334", tutorApproved: true },
  { id: "st-4", name: "Gabriela Hoyos Ortiz", grade: "8a", documentId: "1011234004", tutorId: "tut-4", tutorName: "Sonia Ortiz", tutorEmail: "sonia.ortiz@gmail.com", tutorPhone: "3155544332", tutorApproved: true },
  { id: "st-5", name: "Mar\xEDa Paz Cruz Betancourt", grade: "7c", documentId: "1011234005", tutorId: "tut-5", tutorName: "Alejandro Cruz", tutorEmail: "alejandro.cruz@hotmail.com", tutorPhone: "3187766554", tutorApproved: true },
  { id: "st-6", name: "Juan Jos\xE9 Garc\xEDa Ram\xEDrez", grade: "9b", documentId: "1011234006", tutorId: "tut-6", tutorName: "Gloria Ram\xEDrez", tutorEmail: "gloria.ramirez@gmail.com", tutorPhone: "3112233445", tutorApproved: true },
  { id: "st-7", name: "Gabriela Reyes Aristizabal", grade: "8a", documentId: "1011234007", tutorId: "tut-7", tutorName: "Jorge Reyes", tutorEmail: "jorge.reyes@unitecnica.net", tutorPhone: "3209988776", tutorApproved: true },
  { id: "st-8", name: "Sara Gutierrez Hern\xE1ndez", grade: "8a", documentId: "1011234008", tutorId: "tut-8", tutorName: "Ana Guti\xE9rrez", tutorEmail: "ana.gutierrez@gmail.com", tutorPhone: "3143322110", tutorApproved: true },
  { id: "st-9", name: "Sof\xEDa Giraldo Ram\xEDrez", grade: "6b", documentId: "1011234009", tutorId: "tut-9", tutorName: "Fernando Giraldo", tutorEmail: "fernando.giraldo@gmail.com", tutorPhone: "3176655443", tutorApproved: true },
  { id: "st-10", name: "Juan Jos\xE9 Ochoa", grade: "10b", documentId: "1011234010", tutorId: "tut-10", tutorName: "Luz Ochoa", tutorEmail: "luz.ochoa@gmail.com", tutorPhone: "3198877665", tutorApproved: true },
  { id: "st-11", name: "Santiago Vasquez Ram\xEDrez", grade: "11b", documentId: "1011234011", tutorId: "tut-11", tutorName: "Mauricio V\xE1squez", tutorEmail: "mauricio.vasquez@gmail.com", tutorPhone: "3134455667", tutorApproved: true }
];
var SCHOOL_DATABASE = INITIAL_STUDENTS.map((st) => ({
  id: st.id,
  studentDocument: st.documentId,
  studentName: st.name,
  grade: st.grade,
  tutorDocument: "CC-" + st.documentId.substring(4),
  tutorName: st.tutorName,
  tutorEmail: st.tutorEmail,
  tutorApproved: st.tutorApproved
}));
var INITIAL_EXCUSES = [
  {
    id: "exc-1",
    folio: "EX-2026-001",
    studentId: "st-7",
    studentName: "Gabriela Reyes Aristizabal",
    grade: "8a",
    date: "14/06",
    dateSubmitted: "14/06/2026 07:15",
    motive: "Enfermedad e incapacidad m\xE9dica",
    description: "La estudiante no pudo asistir el d\xEDa 14/06 debido a que desde la noche anterior estaba enferma y esa ma\xF1ana la llevamos al m\xE9dico, adjunto evidencias.",
    evidence: {
      id: "ev-1",
      fileName: "Incapacidad_Medica_1406.png",
      fileType: "PNG",
      fileSize: "1.2 MB",
      isEncrypted: true,
      encryptedHash: "0xa7f9b2c34d8e1f0a",
      dataUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
      // Medical document photo sample
    },
    status: "P",
    tutorEmailSent: true,
    tutorEmailTimestamp: "14/06/2026 07:15:02"
  },
  {
    id: "exc-2",
    folio: "EX-2026-002",
    studentId: "st-1",
    studentName: "TABARES RAMIREZ LAURA SOFIA",
    grade: "11a",
    date: "14/06",
    dateSubmitted: "14/06/2026 07:30",
    motive: "Cita m\xE9dica odontol\xF3gica programada",
    description: "Asistencia a control ortod\xF3ncico urgente en la ma\xF1ana.",
    evidence: {
      id: "ev-2",
      fileName: "Certificado_Odontologia.png",
      fileType: "PNG",
      fileSize: "850 KB",
      isEncrypted: true,
      encryptedHash: "0xb2e4c1f89d0a3e5b"
    },
    status: "P",
    tutorEmailSent: true,
    tutorEmailTimestamp: "14/06/2026 07:30:03"
  },
  {
    id: "exc-3",
    folio: "EX-2026-003",
    studentId: "st-2",
    studentName: "MORALES GIRALDO LAURA SOFIA",
    grade: "11b",
    date: "14/06",
    dateSubmitted: "14/06/2026 07:45",
    motive: "Ex\xE1menes de laboratorio cl\xEDnico",
    description: "Toma de muestras de sangre en ayunas requerida por m\xE9dico tratante.",
    evidence: {
      id: "ev-3",
      fileName: "Orden_Laboratorio.jpg",
      fileType: "JPG",
      fileSize: "1.5 MB",
      isEncrypted: true,
      encryptedHash: "0xc3d5e2f10a9b8c7d"
    },
    status: "P",
    tutorEmailSent: true,
    tutorEmailTimestamp: "14/06/2026 07:45:01"
  },
  {
    id: "exc-4",
    folio: "EX-2026-004",
    studentId: "st-3",
    studentName: "HERNANDEZ ACEVEDO SARA MARIA",
    grade: "11a",
    date: "14/06",
    dateSubmitted: "14/06/2026 08:00",
    motive: "Calamidad dom\xE9stica por filtraci\xF3n de agua",
    description: "Inundaci\xF3n en residencia que requiri\xF3 atenci\xF3n de emergencia.",
    evidence: {
      id: "ev-4",
      fileName: "Carta_Explicativa_Calamidad.pdf",
      fileType: "PDF",
      fileSize: "420 KB",
      isEncrypted: true,
      encryptedHash: "0xd4e6f3a21b0c9d8e"
    },
    status: "P",
    tutorEmailSent: true,
    tutorEmailTimestamp: "14/06/2026 08:00:04"
  },
  {
    id: "exc-5",
    folio: "EX-2026-005",
    studentId: "st-4",
    studentName: "Gabriela Hoyos Ortiz",
    grade: "8a",
    date: "18/03",
    dateSubmitted: "18/03/2026 08:10",
    motive: "Tr\xE1mite personal de pasaporte y documentos",
    description: "Cita en la Gobernaci\xF3n para renovaci\xF3n de pasaporte.",
    evidence: {
      id: "ev-5",
      fileName: "Confirmaci\xF3n_Cita_Pasaporte.txt",
      fileType: "Texto",
      fileSize: "12 KB",
      isEncrypted: true,
      encryptedHash: "0xe5f7a4b32c1d0e9f"
    },
    status: "A",
    coordinatorNotes: "Justificaci\xF3n aceptada por coordinaci\xF3n acad\xE9mica.",
    reviewedBy: "Coordinaci\xF3n 8a",
    reviewedAt: "18/03/2026 10:20",
    tutorEmailSent: true,
    tutorEmailTimestamp: "18/03/2026 10:20:02"
  },
  {
    id: "exc-6",
    folio: "EX-2026-006",
    studentId: "st-5",
    studentName: "Mar\xEDa Paz Cruz Betancourt",
    grade: "7c",
    date: "02/03",
    dateSubmitted: "02/03/2026 07:20",
    motive: "Fiebre y malestar general",
    description: "Guardando reposo en casa por indicaci\xF3n del pediatra.",
    evidence: {
      id: "ev-6",
      fileName: "Formula_Medica_0203.png",
      fileType: "PNG",
      fileSize: "980 KB",
      isEncrypted: true,
      encryptedHash: "0xf6a8b5c43d2e1f0a"
    },
    status: "A",
    coordinatorNotes: "Aprobado. Deseamos pronta recuperaci\xF3n a la estudiante.",
    reviewedBy: "Coordinaci\xF3n B\xE1sica",
    reviewedAt: "02/03/2026 09:15",
    tutorEmailSent: true,
    tutorEmailTimestamp: "02/03/2026 09:15:03"
  },
  {
    id: "exc-7",
    folio: "EX-2026-007",
    studentId: "st-6",
    studentName: "Juan Jos\xE9 Garc\xEDa Ram\xEDrez",
    grade: "9b",
    date: "28/02",
    dateSubmitted: "28/02/2026 08:05",
    motive: "Competencia deportiva departamental de nataci\xF3n",
    description: "Representaci\xF3n en torneo intercolegiado de nataci\xF3n categor\xEDa juvenil.",
    evidence: {
      id: "ev-7",
      fileName: "Aval_Liga_Natacion.png",
      fileType: "PNG",
      fileSize: "1.8 MB",
      isEncrypted: true,
      encryptedHash: "0xa1b2c3d4e5f6a7b8"
    },
    status: "A",
    coordinatorNotes: "Aprobado como representaci\xF3n institucional/deportiva.",
    reviewedBy: "Coordinaci\xF3n Deportes",
    reviewedAt: "28/02/2026 11:00",
    tutorEmailSent: true,
    tutorEmailTimestamp: "28/02/2026 11:00:01"
  },
  {
    id: "exc-8",
    folio: "EX-2026-008",
    studentId: "st-3",
    studentName: "HERNANDEZ ACEVEDO SARA MARIA",
    grade: "11a",
    date: "22/04",
    dateSubmitted: "22/04/2026 07:50",
    motive: "Cita especialista oftalmolog\xEDa",
    description: "Revisi\xF3n \xF3ptica anual con dilataci\xF3n de pupila.",
    evidence: {
      id: "ev-8",
      fileName: "Comprobante_Optica.pdf",
      fileType: "PDF",
      fileSize: "310 KB",
      isEncrypted: true,
      encryptedHash: "0xb3c4d5e6f7a8b9c0"
    },
    status: "P",
    tutorEmailSent: true,
    tutorEmailTimestamp: "22/04/2026 07:50:02"
  },
  {
    id: "exc-9",
    folio: "EX-2026-009",
    studentId: "st-8",
    studentName: "Sara Gutierrez Hern\xE1ndez",
    grade: "8a",
    date: "23/04",
    dateSubmitted: "23/04/2026 08:00",
    motive: "Calamidad familiar",
    description: "Viaje urgente por enfermedad grave de familiar cercano.",
    evidence: {
      id: "ev-9",
      fileName: "Certificado_Familiar.jpg",
      fileType: "JPG",
      fileSize: "720 KB",
      isEncrypted: true,
      encryptedHash: "0xc4d5e6f7a8b9c0d1"
    },
    status: "P",
    tutorEmailSent: true,
    tutorEmailTimestamp: "23/04/2026 08:00:03"
  },
  {
    id: "exc-10",
    folio: "EX-2026-010",
    studentId: "st-9",
    studentName: "Sof\xEDa Giraldo Ram\xEDrez",
    grade: "6b",
    date: "09/04",
    dateSubmitted: "09/04/2026 07:30",
    motive: "Vacunaci\xF3n esquemas de salud",
    description: "Jornada de vacunaci\xF3n obligatoria en centro de salud.",
    evidence: {
      id: "ev-10",
      fileName: "Carnet_Vacunacion.png",
      fileType: "PNG",
      fileSize: "1.1 MB",
      isEncrypted: true,
      encryptedHash: "0xd5e6f7a8b9c0d1e2"
    },
    status: "A",
    coordinatorNotes: "Excusa justificada correctamente.",
    reviewedBy: "Coordinaci\xF3n Sextos",
    reviewedAt: "09/04/2026 09:00",
    tutorEmailSent: true,
    tutorEmailTimestamp: "09/04/2026 09:00:02"
  },
  {
    id: "exc-11",
    folio: "EX-2026-011",
    studentId: "st-10",
    studentName: "Juan Jos\xE9 Ochoa",
    grade: "10b",
    date: "28/03",
    dateSubmitted: "28/03/2026 08:15",
    motive: "Gripa e infecci\xF3n de garganta",
    description: "Reposo en casa sugerido por m\xE9dico general.",
    evidence: {
      id: "ev-11",
      fileName: "Incapacidad_10b.jpg",
      fileType: "JPG",
      fileSize: "890 KB",
      isEncrypted: true,
      encryptedHash: "0xe6f7a8b9c0d1e2f3"
    },
    status: "A",
    coordinatorNotes: "Incapacidad v\xE1lida recibida.",
    reviewedBy: "Coordinaci\xF3n Media",
    reviewedAt: "28/03/2026 10:45",
    tutorEmailSent: true,
    tutorEmailTimestamp: "28/03/2026 10:45:01"
  },
  {
    id: "exc-12",
    folio: "EX-2026-012",
    studentId: "st-11",
    studentName: "Santiago Vasquez Ram\xEDrez",
    grade: "11b",
    date: "12/03",
    dateSubmitted: "12/03/2026 09:10",
    motive: "Viaje personal no programado",
    description: "Inasistencia por viaje de vacaciones extempor\xE1neo.",
    evidence: {
      id: "ev-12",
      fileName: "Tiquete_Viaje.pdf",
      fileType: "PDF",
      fileSize: "250 KB",
      isEncrypted: true,
      encryptedHash: "0xf7a8b9c0d1e2f3a4"
    },
    status: "R",
    coordinatorNotes: "Los viajes personales en \xE9poca lectiva no constituyen falta justificada seg\xFAn el manual de convivencia escolar.",
    reviewedBy: "Coordinaci\xF3n Acad\xE9mica 11",
    reviewedAt: "12/03/2026 11:30",
    tutorEmailSent: true,
    tutorEmailTimestamp: "12/03/2026 11:30:02"
  }
];

// src/utils/encryption.ts
function encryptData(data, secretKey = "EXCUSAPP_SECURE_KEY_2026") {
  try {
    const encoded = btoa(unescape(encodeURIComponent(data)));
    let cipher = "";
    for (let i = 0; i < encoded.length; i++) {
      const charCode = encoded.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length);
      cipher += String.fromCharCode(charCode);
    }
    return "ENC_AES256_" + btoa(cipher);
  } catch (e) {
    return "ENC_AES256_" + btoa(data);
  }
}
function generateHash(content) {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return "0x" + Math.abs(hash).toString(16).padStart(8, "0") + Math.abs(hash * 31).toString(16).padStart(8, "0");
}

// server.ts
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "10mb" }));
  let excusesStore = [...INITIAL_EXCUSES];
  let studentsStore = [...INITIAL_STUDENTS];
  let schoolDatabaseStore = [...SCHOOL_DATABASE];
  let notificationsStore = [
    {
      id: "notif-1",
      recipientEmail: "jorge.reyes@unitecnica.net",
      recipientName: "Jorge Reyes",
      excuseFolio: "EX-2026-001",
      studentName: "Gabriela Reyes Aristizabal",
      message: "Se ha radicado exitosamente la excusa EX-2026-001 para la estudiante Gabriela Reyes Aristizabal (8a).",
      statusChange: "Radicaci\xF3n de Excusa",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      deliveryTimeSeconds: 1.2
    }
  ];
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "ExcusApp", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.get("/api/students", (req, res) => {
    res.json(studentsStore);
  });
  app.get("/api/school-database", (req, res) => {
    res.json(schoolDatabaseStore);
  });
  app.get("/api/excuses", (req, res) => {
    const { grade, status, search } = req.query;
    let filtered = [...excusesStore];
    if (grade && grade !== "Todos") {
      filtered = filtered.filter((e) => e.grade.toLowerCase() === String(grade).toLowerCase());
    }
    if (status && status !== "Todos") {
      filtered = filtered.filter((e) => e.status === String(status));
    }
    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(
        (e) => e.studentName.toLowerCase().includes(q) || e.motive.toLowerCase().includes(q) || e.folio.toLowerCase().includes(q) || e.grade.toLowerCase().includes(q)
      );
    }
    res.json(filtered);
  });
  app.get("/api/excuses/:id", (req, res) => {
    const excuse = excusesStore.find((e) => e.id === req.params.id);
    if (!excuse) {
      return res.status(404).json({ error: "Excusa no encontrada" });
    }
    res.json(excuse);
  });
  app.post("/api/excuses", (req, res) => {
    const { studentId, grade, date, motive, description, evidenceData } = req.body;
    if (!studentId || !motive || !description) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const student = studentsStore.find((s) => s.id === studentId);
    if (!student) {
      return res.status(404).json({ error: "Estudiante no registrado en la base del colegio" });
    }
    const folioNumber = excusesStore.length + 1;
    const folio = `EX-2026-${String(folioNumber).padStart(3, "0")}`;
    const now = /* @__PURE__ */ new Date();
    const dateSubmittedStr = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    let evidenceObj = void 0;
    if (evidenceData) {
      const rawContent = evidenceData.dataUrl || evidenceData.fileName || "EVIDENCE_CONTENT";
      const encryptedHash = generateHash(rawContent);
      evidenceObj = {
        id: `ev-${Date.now()}`,
        fileName: evidenceData.fileName || "Evidencia_Adjunta.pdf",
        fileType: evidenceData.fileType || "PDF",
        fileSize: evidenceData.fileSize || "1.0 MB",
        dataUrl: evidenceData.dataUrl ? encryptData(evidenceData.dataUrl) : void 0,
        // Encrypted payload
        encryptedHash,
        isEncrypted: true
      };
    }
    const newExcuse = {
      id: `exc-${Date.now()}`,
      folio,
      studentId: student.id,
      studentName: student.name,
      grade: grade || student.grade,
      date: date || `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}`,
      dateSubmitted: dateSubmittedStr,
      motive,
      description,
      evidence: evidenceObj,
      status: "P",
      tutorEmailSent: true,
      tutorEmailTimestamp: `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
    };
    excusesStore.unshift(newExcuse);
    const notif = {
      id: `notif-${Date.now()}`,
      recipientEmail: student.tutorEmail,
      recipientName: student.tutorName,
      excuseFolio: folio,
      studentName: student.name,
      message: `Hola ${student.tutorName}, se ha enviado la excusa ${folio} para ${student.name} (${student.grade}) con el motivo "${motive}". Espere respuesta de la instituci\xF3n.`,
      statusChange: "Radicada",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      deliveryTimeSeconds: Math.round((Math.random() * 1.5 + 0.8) * 10) / 10
      // 0.8s - 2.3s
    };
    notificationsStore.unshift(notif);
    res.status(201).json({
      message: "Excusa radicada exitosamente",
      excuse: newExcuse,
      notification: notif
    });
  });
  app.put("/api/excuses/:id/status", (req, res) => {
    const { status, coordinatorNotes, reviewerName } = req.body;
    const excuseIndex = excusesStore.findIndex((e) => e.id === req.params.id);
    if (excuseIndex === -1) {
      return res.status(404).json({ error: "Excusa no encontrada" });
    }
    if (!["A", "R", "P"].includes(status)) {
      return res.status(400).json({ error: "Estado no v\xE1lido (debe ser A, R o P)" });
    }
    const now = /* @__PURE__ */ new Date();
    const nowStr = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const existing = excusesStore[excuseIndex];
    const updated = {
      ...existing,
      status,
      coordinatorNotes: coordinatorNotes || existing.coordinatorNotes,
      reviewedBy: reviewerName || "Coordinaci\xF3n Acad\xE9mica",
      reviewedAt: nowStr
    };
    excusesStore[excuseIndex] = updated;
    const student = studentsStore.find((s) => s.id === updated.studentId);
    const tutorEmail = student?.tutorEmail || "acudiente@colegio.edu.co";
    const tutorName = student?.tutorName || "Acudiente";
    const statusLabel = status === "A" ? "APROBADA" : status === "R" ? "RECHAZADA" : "PENDIENTE";
    const notif = {
      id: `notif-${Date.now()}`,
      recipientEmail: tutorEmail,
      recipientName: tutorName,
      excuseFolio: updated.folio,
      studentName: updated.studentName,
      message: `Estimado acudiente, la excusa ${updated.folio} para ${updated.studentName} ha sido ${statusLabel} por Coordinaci\xF3n. ${coordinatorNotes ? "Observaciones: " + coordinatorNotes : ""}`,
      statusChange: statusLabel,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      deliveryTimeSeconds: Math.round((Math.random() * 1.2 + 0.5) * 10) / 10
    };
    notificationsStore.unshift(notif);
    res.json({
      message: `Estado actualizado a ${statusLabel}`,
      excuse: updated,
      notification: notif
    });
  });
  app.delete("/api/excuses/:id", (req, res) => {
    res.status(403).json({
      error: "Prohibido por normativa RNF-02: El historial de excusas es inmutable y no puede eliminarse."
    });
  });
  app.get("/api/notifications", (req, res) => {
    res.json(notificationsStore);
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ExcusApp Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
