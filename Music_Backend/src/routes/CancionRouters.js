import express from "express";
import CancionController from '../controllers/CancionController.js';

const router = express.Router();

//rutas para obtener cancione mas populares
router.get("/populares", CancionController.getCancionesMasPopulares);
// Obtener todas las canciones
router.get("/", CancionController.getAllCanciones);
// Obtener una canción por su ID
router.get("/:id", CancionController.getCancionById);
// Obtener canciones de un álbum por su ID
router.get("/album/:albumId", CancionController.getCancionesByAlbumId);
// Obtener canciones de un artista por su ID
router.get("/artista/:id", CancionController.getCancionesByArtistaId);
//obeteer canciones por cada album de cada género musical
router.get("/genero/:generoId", CancionController.getCancionesAlbumGenero);

export default router;