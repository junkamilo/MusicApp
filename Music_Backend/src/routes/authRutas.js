import express from "express";
import AuthController from "../controllers/authController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";
import { verifyRefreshToken } from "../middlewares/auth/verifyRefreshToken.js";


const router = express.Router();

//ruta para registrar usuario
router.post("/registro", AuthController.register);

//ruta para iniciar sesion
router.post("/login", AuthController.login);

// Ruta para refrescar el token del usuario autenticado
router.post("/refresh", verifyRefreshToken,AuthController.refreshToken);

// Logout
router.post("/logout", verifyToken,AuthController.logout);

// Ruta para obtener la información del usuario autenticado
router.get("/user-info", verifyToken, AuthController.getUsuarioInfo);

// Ruta para actualizar la información del usuario autenticado
router.put("/actualizar", verifyToken,AuthController.updateUsuarioInfo);

// Ruta para cambiar la contraseña del usuario autenticado
router.put("/cambiar-password", verifyToken, AuthController.cambiarPassword);



export default router;