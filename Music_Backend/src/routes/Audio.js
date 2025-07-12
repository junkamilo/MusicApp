import express from "express";
import AudioController from "../controllers/subirAudio.js";
import upload from "../middlewares/upload.js";


const router = express.Router();

// Esta es la ruta correcta con el middleware
router.patch("/upload/audio/:id", upload.single("file"), AudioController.subirAudio);

export default router;
