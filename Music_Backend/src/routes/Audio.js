import express from "express";
import AudioController from "../controllers/subirAudio.js";
import { uploadMultiple, uploadSingle } from "../middlewares/upload.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";



const router = express.Router();

    router.post("/cancion/audio", verifyToken, uploadSingle, AudioController.crearCancionConAudio);

// Esta es la ruta correcta con el middleware
router.patch("/upload/audio/:id", verifyToken,uploadSingle, AudioController.subirAudio);

router.put("/upload/audios", uploadMultiple, AudioController.subirMultiplesAudios);

export default router;
