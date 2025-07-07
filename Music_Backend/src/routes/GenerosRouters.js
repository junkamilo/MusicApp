import express from "express";
import GenerosController from "../controllers/GenerosController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

// Obtener los géneros favoritos de un usuario
router.get("/favoritos", verifyToken,GenerosController.getGenerosFavoritosByUserId);
// Agregar un género favorito
router.post("/favoritos", verifyToken,GenerosController.addGeneroFavorito);
// Eliminar un género favorito
router.delete("/favoritos", verifyToken,GenerosController.removeGeneroFavorito);
// Eliminar todos los géneros favoritos de un usuario
router.delete("/favoritos/todos", verifyToken,GenerosController.removeAllGenerosFavoritos);

// Obtener todos los géneros musicales
router.get("/", GenerosController.getAllGeneros);
// Obtener un género musical por su ID
router.get("/:id", GenerosController.getGeneroById);






export default router;