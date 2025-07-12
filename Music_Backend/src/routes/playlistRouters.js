import express from "express";

import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";
import PlaylistController from "../controllers/PlaylistControllers.js";


const router = express.Router();

// Crear una nueva playlist (requiere autenticación)
router.post("/crearPlaylist", verifyToken, PlaylistController.crearPlaylist);

// Agregar una canción a una playlist (requiere autenticación)
router.post("/:playlist_id/canciones", verifyToken, PlaylistController.agregarCancion);

// Obtener una playlist con todas sus canciones (pública o protegida según tu lógica)
router.get("/:playlist_id", verifyToken,PlaylistController.obtenerPlaylist);

export default router;