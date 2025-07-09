// src/middlewares/upload.js
import multer from "multer";
import path from "path";

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/audio"); // Asegúrate de que esta carpeta exista
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

// Crear el middleware
const upload = multer({ storage, fileFilter });

export default upload;
