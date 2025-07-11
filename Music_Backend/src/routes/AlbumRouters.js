import express from "express";
import AlbumController from "../controllers/AlbumController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

// Obtener álbumes favoritos de un usuario autenticado
router.get("/favoritos", verifyToken, AlbumController.getAlbumesFavoritosByUserId);

// Agregar un álbum a favoritos
router.post("/favoritos", verifyToken, AlbumController.addAlbumToFavorites);

// Eliminar un álbum específico de favoritos
router.delete("/favoritos/:userId/:albumId", verifyToken, AlbumController.removeAlbumFromFavorites);

// Eliminar todos los álbumes favoritos de un usuario
router.delete("/favoritos/:userId", verifyToken, AlbumController.removeAllFavorites);

// Obtener álbumes más populares (global)
router.get("/populares", AlbumController.getAlbumesMasPopulares);

// Obtener álbumes por ID de artista
router.get("/artista/:id", AlbumController.getAlbumesByArtistaId);

// Obtener álbumes por ID de género musical
router.get("/genero/:generoId", AlbumController.getAlbumesPorGeneroId);

// Obtener canciones de un álbum por su ID
router.get("/:albumId/canciones", AlbumController.getCancionesByAlbumId);

// Obtener todos los álbumes
router.get("/", AlbumController.getAllAlbumes);

// Obtener un álbum por su ID
router.get("/:id", AlbumController.getAlbumById);

export default router;