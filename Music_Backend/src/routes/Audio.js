import express from "express";
import AudioController from "../controllers/subirAudio.js";
import { uploadMultiple, uploadSingle } from "../middlewares/upload.js";



const router = express.Router();

// Esta es la ruta correcta con el middleware
router.patch("/upload/audio/:id", uploadSingle, AudioController.subirAudio);

router.put("/upload/audios", uploadMultiple, AudioController.subirMultiplesAudios);

export default router;
