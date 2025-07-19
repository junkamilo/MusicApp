import express from "express";
import MisPublicacionesController from "../controllers/MisPublicacionesController .js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, MisPublicacionesController.listar);
router.delete("/cancion/:id", verifyToken, MisPublicacionesController.eliminarCancion);
router.delete("/album/:id", verifyToken, MisPublicacionesController.eliminarAlbum);
router.put("/album/:id", verifyToken, MisPublicacionesController.modificarAlbum);
router.post("/cancion", verifyToken, MisPublicacionesController.subirCancion);

export default router;
