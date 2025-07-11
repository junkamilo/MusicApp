import express from "express";
import CancionController from '../controllers/CancionController.js';
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

//Obtener canciones favoritas de un usuario autenticado
router.get("/favoritos", verifyToken, CancionController.getCancionesFavoritosByUserId);

//Agregar una canción a favoritos
router.post("/favoritos", verifyToken, CancionController.addCancionToFavorites);

//Eliminar todas las canciones favoritas del usuario
router.delete("/favoritos/todos", verifyToken, CancionController.removeAllFavorites);

//Eliminar una canción de favoritos por su ID
router.delete("/favoritos/:id", verifyToken, CancionController.removeCancionFromFavorites);

//Obtener canciones más populares (global)
router.get("/populares", CancionController.getCancionesMasPopulares);

//Obtener canciones por ID de artista
router.get("/artista/:id", CancionController.getCancionesByArtistaId);

//Obtener canciones por ID de género musical agrupadas por álbum
router.get("/genero/:generoId", CancionController.getCancionesAlbumGenero);

//Obtener canciones por ID de álbum
router.get("/album/:albumId", CancionController.getCancionesByAlbumId);

//Obtener una canción por su ID
router.get("/:id", CancionController.getCancionById);

//Obtener todas las canciones
router.get("/", CancionController.getAllCanciones);


export default router;