import express from "express";
import ArtistaController from "../controllers/ArtistaController.js";

const router = express.Router();

//obtener todos los Artistas
router.get("/", ArtistaController.getAllArtistas);
//obtener artistas destacados por género
router.get("/destacados", ArtistaController.getArtistasDestacadosPorGenero);
//obtener un Artista por su id
router.get("/:id", ArtistaController.getArtistaById);
//obtener artitas con sus respectivos generos musicales
router.get("/genero/:generoId", ArtistaController.getArtistasPorGeneroId);


export default router;