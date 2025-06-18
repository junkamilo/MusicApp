import express from "express";
import ArtistaController from "../controllers/ArtistaController.js";

const router = express.Router();

//obtener todos los Artistas
router.get("/", ArtistaController.getAllArtistas);
//obtener un Artista por su id
router.get("/:id", ArtistaController.getArtistaById);
//obtener los albumes de un Artista por su id
router.get("/:id/albumes", ArtistaController.getAlbumesByArtistaId);
//obtener las canciones de un album por su id
router.get("/albumes/:albumId/canciones", ArtistaController.getCancionesByAlbumId);
//obtener las canciones de un Artista por su id
router.get("/:id/canciones", ArtistaController.getCancionesByArtistaId);


export default router;