import express from "express";
import AlbumController from "../controllers/AlbumController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

// Obtener álbumes favoritos de un usuario autenticado
router.get("/favoritos", verifyToken, AlbumController.getAlbumesFavoritosByUserId);

// Agregar un álbum a favoritos
router.post("/favoritos", verifyToken, AlbumController.addAlbumToFavorites);

// Eliminar todos los álbumes del usuario
router.delete("/favoritos/todos", verifyToken, AlbumController.removeAllFavorites);

// Eliminar un álbum de favoritos
router.delete("/favoritos/:id", verifyToken, AlbumController.removeAlbumFromFavorites);

// Obtener álbumes más populares (global)
router.get("/populares", AlbumController.getAlbumesMasPopulares);

// Obtener álbumes por ID de artista
router.get("/artista/:id", AlbumController.getAlbumesByArtistaId);

// Obtener álbumes por ID de género musical
router.get("/genero/:generoId", AlbumController.getAlbumesPorGeneroId);

// Obtener canciones de un álbum por su ID
router.get("/:albumId/canciones", AlbumController.getCancionesByAlbumId);

// Obtener un álbum por su ID
router.get("/:id", AlbumController.getAlbumById);

// Obtener todos los álbumes
router.get("/", AlbumController.getAllAlbumes);

export default router;