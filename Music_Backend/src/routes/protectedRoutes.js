import express from "express";
import { verifyToken } from "../middlewares/auth/index.js";

const router = express.Router();

router.get("/perfil", verifyToken, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Acceso autorizado",
    user: req.user,
  });
});

export default router;
