import jwt from "jsonwebtoken"; //para generar y verificar tokens
import dotenv from "dotenv"; //para leer variables de entorno
import bcrypt from "bcryptjs"; //para encriptar contraseñas
import { Usuario } from "../models/Usuario.js";
import Artista from "../models/Artista.js";

dotenv.config(); //para leer variables de entorno

//cargamos las variables del .env
const secretKey = process.env.ACCESS_TOKEN_SECRET;
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;
const tokenExpiration = process.env.TOKEN_EXPIRATION;
const refreshExpiration = process.env.REFRESH_EXPIRATION;

class AuthService {
  //Registrar un nuevo usuario
  static async register(nombre, email, contrasena) {
    try {
      console.log("[register] Iniciando registro...");
      const userExists = await Usuario.findByEmail(email);
      if (userExists) {
        console.log("[register] Usuario ya existe:", email);
        return {
          error: true,
          code: 401,
          message: "El correo ya se encuentra registrado en el sistema",
        };
      }
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      const userId = await Usuario.create(nombre, email, hashedPassword);
      console.log("[register] Usuario creado con ID:", userId);
      return { error: false, code: 201, message: "Usuario creado" };
    } catch (error) {
      console.error("[register] Error:", error);
      return { error: true, code: 500, message: "Error al crear el usuario" };
    }
  }

  // Iniciar sesión
  static async login(email, contrasena) {
    try {
      console.log("[login] Iniciando sesión para:", email);
      const user = await Usuario.findByEmail(email);
      console.log("[login] Resultado de findByEmail:", user);

      if (!user) {
        return {
          error: true,
          code: 401,
          message: "El correo o la contraseña proporcionados no son correctos.",
        };
      }

      const validPassword = await bcrypt.compare(contrasena, user.contrasena);
      if (!validPassword) {
        return {
          error: true,
          code: 401,
          message: "El correo o la contraseña proporcionados no son correctos.",
        };
      }

      let artista_id = null;
      try {
        const artista = await Artista.getArtistaIdByUsuarioId(user.id_usuario);
        artista_id = artista?.artista_id ?? null;
        console.log("[login] Artista encontrado:", artista_id);
      } catch (e) {
        console.log("⚠️ No es artista o no se encontró artista_id");
      }

      const userData = {
        ...user,
        artista_id,
      };

      const accessToken = this.generateAccessToken(userData);
      const refreshToken = this.generateRefreshToken(userData);
      console.log("[login] Tokens generados:", { accessToken, refreshToken });

      await Usuario.updateRefreshToken(user.id_usuario, refreshToken);
      console.log("[login] Refresh token actualizado para el usuario");

      return {
        error: false,
        code: 201,
        message: "Usuario autenticado correctamente",
        data: {
          accessToken,
          refreshToken,
          user: {
            id: user.id_usuario,
            nombre: user.nombre,
            email: user.email,
            artista_id,
          },
        },
      };
    } catch (error) {
      console.error("[login] Error:", error);
      return { error: true, code: 500, message: "Error en el servidor" };
    }
  }

  static generateAccessToken(user) {
  console.log("🧱 Generando access token con:", user);
  return jwt.sign(
    {
      id: user.id_usuario || user.id,
      email: user.email,
      nombre: user.nombre || null,
      artista_id: user.artista_id || null,
    },
    secretKey,
    { expiresIn: tokenExpiration }
  );
}


  static generateRefreshToken(user) {
    console.log("[generateRefreshToken] Generando refresh token...");
    return jwt.sign(
      {
        id: user.id_usuario,
        email: user.email,
      },
      refreshSecretKey,
      { expiresIn: refreshExpiration }
    );
  }

static async verifyAccessToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, refreshSecretKey);
    console.log("Refresh token decodificado:", decoded);

    const user = await Usuario.findByEmail(decoded.email);
    console.log("Usuario encontrado:", user);

    if (!user || user.refreshToken !== refreshToken) {
      console.log("Token guardado:", user?.refresh_token);
      console.log("Token recibido:", refreshToken);
      return { error: true, code: 403, message: "Token inválido" };
    }

    let artista_id = null;
    try {
      const artista = await Artista.getArtistaIdByUsuarioId(user.id_usuario);
      artista_id = artista?.artista_id;
    } catch (e) {
      console.log("⚠️ No es artista o no se encontró artista_id");
    }

    const userData = {
      ...user,
      artista_id,
    };

    console.log("✅ Usuario para nuevo token:", userData);

    const accessToken = this.generateAccessToken(userData);
    const newRefreshToken = await this.renewAccessToken(refreshToken, user);
    const refreshToSend = newRefreshToken || refreshToken;

    return {
      error: false,
      code: 201,
      message: "Token actualizado correctamente",
      data: {
        accessToken,
        refreshToken: refreshToSend,
      },
    };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        error: true,
        code: 403,
        message: "Token expirado, solicita un nuevo token",
      };
    }
    return { error: true, code: 403, message: "Token inválido" };
  }
}


  static async renewAccessToken(refreshToken, user) {
    try {
      console.log("[renewAccessToken] Renovando token si es necesario...");
      let newRefreshToken = "";
      const decoded = jwt.decode(refreshToken, { complete: true });
      const tiempoRestante = decoded.exp - Math.floor(Date.now() / 1000);
      console.log("Tiempo restante del refresh token:", tiempoRestante, "segundos");

      if (tiempoRestante < 60 * 60 * 24) {
        newRefreshToken = jwt.sign({ id: decoded.id }, refreshSecretKey, {
          expiresIn: refreshExpiration,
        });
        await Usuario.updateRefreshToken(user.id_usuario, newRefreshToken);
        console.log("[renewAccessToken] Nuevo refresh token generado y guardado");
      }

      return newRefreshToken;
    } catch (error) {
      console.error("[renewAccessToken] Error:", error);
      return "";
    }
  }

  static async obtenerInfoUsuario(userId) {
    try {
      console.log("[obtenerInfoUsuario] Consultando información del usuario:", userId);
      const userInfo = await Usuario.getUserInfo(userId);
      if (!userInfo) {
        return { error: true, code: 404, message: "Usuario no encontrado" };
      }
      return { error: false, code: 200, data: userInfo };
    } catch (error) {
      console.error("[obtenerInfoUsuario] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error al obtener la información del usuario",
      };
    }
  }

  static async logout(userId) {
    console.log("[logout] Cerrando sesión del usuario:", userId);
    await Usuario.updateRefreshToken(userId, null);
    return { error: false, code: 200, message: "Sesión cerrada correctamente" };
  }

  static async actualizarInfoUsuario(userId, nombre, email) {
    try {
      console.log("[actualizarInfoUsuario] Actualizando usuario:", userId);
      const emailExists = await Usuario.emailExists(email, userId);
      if (emailExists) {
        return { error: true, code: 400, message: "El correo ya está en uso" };
      }
      await Usuario.updateUserInfo(userId, nombre, email);
      return {
        error: false,
        code: 200,
        message: "Información actualizada correctamente",
      };
    } catch (error) {
      console.error("[actualizarInfoUsuario] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error al actualizar la información del usuario",
      };
    }
  }

  static async cambiarPassword(userId, currentPassword, newPassword) {
    try {
      console.log("[cambiarPassword] Cambiando contraseña para usuario:", userId);
      const user = await Usuario.findById(userId);
      if (!user) {
        return { error: true, code: 404, message: "Usuario no encontrado" };
      }

      const passwordCorrecta = await bcrypt.compare(currentPassword, user.contrasena);
      if (!passwordCorrecta) {
        return {
          error: true,
          code: 401,
          message: "La contraseña actual es incorrecta",
        };
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await Usuario.updatePassword(userId, hashedNewPassword);

      return {
        error: false,
        code: 200,
        message: "Contraseña actualizada correctamente",
      };
    } catch (error) {
      console.error("[cambiarPassword] Error:", error);
      return {
        error: true,
        code: 500,
        message: "Error al cambiar la contraseña",
      };
    }
  }
}

export default AuthService;

