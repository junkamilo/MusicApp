import express from "express";
import ArtistaController from "../controllers/ArtistaController.js";

const router = express.Router();

//obtener todos los Artistas
router.get("/", ArtistaController.getAllArtistas);

export default router;