import multer from "multer";
import path from "path";

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/audio");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

// Filtro para aceptar solo archivos .mp3
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/mp3") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos MP3."), false);
  }
};

// ✅ Middleware general (sin .single o .array todavía)
const upload = multer({ storage, fileFilter });

// Exporta ambos casos según lo necesites
export const uploadSingle = upload.single("file");     // Para un solo archivo
export const uploadMultiple = upload.array("files", 20); // Para múltiples archivos

export default upload;


