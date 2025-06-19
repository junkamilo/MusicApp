import express from "express";
import ArtistaController from "../controllers/ArtistaController.js";

const router = express.Router();

//obtener todos los Artistas
router.get("/", ArtistaController.getAllArtistas);
//obtener un Artista por su id
router.get("/:id", ArtistaController.getArtistaById);


export default router;