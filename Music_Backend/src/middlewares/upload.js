import multer from "multer";
import path from "path";
import fs from "fs";

// Configuración dinámica del almacenamiento con verificación de carpeta
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isImage = file.mimetype.startsWith("image");
    const destino = isImage ? "uploads/imagenes" : "uploads/audio";

    // Verificar y crear carpeta si no existe
    if (!fs.existsSync(destino)) {
      fs.mkdirSync(destino, { recursive: true });
      console.log(`📁 Carpeta creada: ${destino}`);
    }

    cb(null, destino);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  }
});

// Filtro para aceptar solo imágenes y audios mp3
const fileFilter = (req, file, cb) => {
  console.log("🧪 Mimetype:", file.mimetype);
  console.log("🧪 Extensión:", path.extname(file.originalname));
  const ext = path.extname(file.originalname).toLowerCase();
  const isImage = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
  const isAudio = [".mp3"].includes(ext);
  if (isImage || isAudio) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos MP3, JPG, PNG o WEBP."), false);
  }
};

// Configuración final de Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Máximo 10MB
});

// Exporta los middlewares según necesidad
export const uploadSingle = upload.single("file");
export const uploadMultiple = upload.array("files", 20);

export default upload;




