import express from "express";
import GenerosController from "../controllers/GenerosController.js";

const router = express.Router();

// Obtener todos los géneros musicales
router.get("/", GenerosController.getAllGeneros);
// Obtener un género musical por su ID
router.get("/:id", GenerosController.getGeneroById);

export default router;