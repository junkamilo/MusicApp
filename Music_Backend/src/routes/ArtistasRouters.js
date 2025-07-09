import express from "express";
import ArtistaController from "../controllers/ArtistaController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

// Obtener todos los artistas
router.get("/", ArtistaController.getAllArtistas);

// Obtener artistas destacados por género
router.get("/destacados", ArtistaController.getArtistasDestacadosPorGenero);

// Obtener artistas con sus respectivos géneros musicales
router.get("/genero/:generoId", ArtistaController.getArtistasPorGeneroId);

// Agregar un artista a favoritos
router.post("/favoritos", verifyToken,ArtistaController.addArtistaAFavoritos);

// Obtener artistas favoritos del usuario
router.get("/favoritos", verifyToken,ArtistaController.getArtistasFavoritosByUserId);

// Eliminar todos los artistas favoritos del usuario
router.delete("/favoritos/todos", verifyToken,ArtistaController.eliminarTodosArtistasFavoritos);

// Eliminar un artista de favoritos
router.delete("/favoritos/:id", verifyToken,ArtistaController.eliminarArtistaFavorito);

// Obtener un artista por su ID (esta debe ir al final)
router.get("/:id", ArtistaController.getArtistaById);




export default router;