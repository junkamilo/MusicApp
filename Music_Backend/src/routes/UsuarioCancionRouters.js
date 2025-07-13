import express from "express";
import { uploadSingle } from "../middlewares/upload.js";
import CancionUsuarioController from "../controllers/CancionUsuarioController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

// Ruta para subir una canción de usuario
router.put("/upload/user-audio/:id_usuario", verifyToken,uploadSingle, CancionUsuarioController.subirCancionUsuario);

// Ruta para obtener las canciones de un usuario
router.get("/canciones-usuario/:id_usuario",verifyToken,CancionUsuarioController.obtenerCancionesUsuario);

// Ruta para eliminar una canción de usuario
router.delete("/canciones-usuario/:id_cancion_usuario", verifyToken, CancionUsuarioController.eliminarCancionUsuario);

export default router;
