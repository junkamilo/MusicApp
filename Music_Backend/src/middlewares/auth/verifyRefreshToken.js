import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ResponseProvider } from "../../providers/ResponseProvider.js";

dotenv.config();

const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;

export function verifyRefreshToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ResponseProvider.error(
      res,
      "Token de refresco no proporcionado",
      401
    );
  }

  const refreshToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(refreshToken, refreshSecretKey);
    req.user = decoded;
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return ResponseProvider.error(res, "Token de refresco expirado", 403);
    }

    return ResponseProvider.error(res, "Token de refresco inválido", 403);
  }
}