import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// Rutas
import ArtistasRouters from './src/routes/ArtistasRouters.js';
import AlbumRouters from './src/routes/AlbumRouters.js';
import CancionRouters from './src/routes/CancionRouters.js';
import GenerosRouters from './src/routes/GenerosRouters.js';
import authRutas from './src/routes/authRutas.js';
import protectedRoutes from './src/routes/protectedRoutes.js';
import AudioRouter from './src/routes/Audio.js';
import UsuarioCancionRouters from './src/routes/UsuarioCancionRouters.js';

// Cargar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Habilitar CORS
app.use(cors());

// ✅ Ruta de subida de archivos (usa Multer) – DEBE IR ANTES del body-parser
app.use('/upload-audio', AudioRouter);

// 🔽 Middlewares que procesan el cuerpo de la petición (no deben ir antes de multer)
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para cookies
app.use(cookieParser());

// Rutas del resto de módulos
app.use('/artistas', ArtistasRouters);
app.use('/albumes', AlbumRouters);
app.use('/canciones', CancionRouters);
app.use('/generosMusicales', GenerosRouters);
app.use('/auth', authRutas);
app.use('/api', protectedRoutes);
app.use('/api', UsuarioCancionRouters);

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log("📂 Servidor sirviendo archivos desde:", path.join(__dirname, "uploads"));

// Puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});






