import express from "express";
import AlbumController from "../controllers/AlbumController.js";

const router = express.Router();

// Obtener álbumes más populares
router.get("/populares", AlbumController.getAlbumesMasPopulares);
// Obtener álbumes más populares de cada género
router.get("/genero/:generoId", AlbumController.getAlbumesPorGeneroId);
// Obtener álbumes de un artista por su ID
router.get("/artista/:id", AlbumController.getAlbumesByArtistaId);
// Obtener canciones de un álbum por su ID
router.get("/:albumId/canciones", AlbumController.getCancionesByAlbumId);

// Obtener un álbum por su ID
router.get("/:id", AlbumController.getAlbumById);

// Obtener todos los álbumes
router.get("/", AlbumController.getAllAlbumes); 

export default router;