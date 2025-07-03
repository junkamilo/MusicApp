import jwt from "jsonwebtoken"; //para generar y verificar tokens
import dotenv from "dotenv"; //para leer variables de entorno
import bcrypt from "bcryptjs"; //para encriptar contraseñas
import { Usuario } from "../models/Usuario.js";

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
      //verificamos si el usuario ya existe
      const userExists = await Usuario.findByEmail(email);
      // Validamos si el correo ya esta registrado en la base de datos
      if (userExists)
        return {
          error: true,
          code: 401,
          message: "El correo ya se encuentra registrado en el sistema",
        };
      // Hashear la contraseña || encriptar la contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      // Registramos el usuario en la base de datos
      const userId = await Usuario.create(nombre, email, hashedPassword);
      // Retornamos la respuesta
      return { error: false, code: 201, message: "Usuario creado" };
    } catch (error) {
      return { error: true, code: 500, message: "Error al crear el usuario" };
    }
  }

  //Iniciar sesión
  static async login(email, contrasena) {
    try {
      // Consultamos el usuario por el email
      const user = await Usuario.findByEmail(email);
      if (!user)
        return {
          error: true,
          code: 401,
          message: "El correo o la contraseña proporcionados no son correctos.",
        };
      // Comparmamos la contraseña del usuarios registrado con la ingresada basado en la llave de encriptación
      const validPassword = await bcrypt.compare(contrasena, user.contrasena);
      // Validamos si la contraseña es la misma
      if (!validPassword)
        return {
          error: true,
          code: 401,
          message: "El correo o la contraseña proporcionados no son correctos.",
        };
      // Generamos el token de seguridad
      const accessToken = this.generateAccessToken(user);
      // Generamos el refresh token
      const refreshToken = this.generateRefreshToken(user);
      // Actualizamos el refreshToken en la base de datos
      await Usuario.updateRefreshToken(user.id_usuario, refreshToken);
      // Retornamos los datos de validación del usuario
      return {
        error: false,
        code: 201,
        message: "Usuario autenticado correctamente",
        data: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      console.log(error);
      return { error: true, code: 500, message: "Error en el servidor" };
    }
  }

  //generamos el accessToken 
  static generateAccessToken(user) {
    return jwt.sign(
      {
        id: user.id_usuario,
        email: user.email,
        // Podemos pasar más datos
      },
      secretKey,
      { expiresIn: tokenExpiration }
    );
  }

  //generamos el refreshToken
  static generateRefreshToken(user) {
    return jwt.sign(
      {
        id: user.id_usuario,
        email: user.email,
        // Podemos pasar más datos
      },
      refreshSecretKey,
      { expiresIn: refreshExpiration }
    );
  }

  //Verificar refreshToken y generar uno nuevo
  static async verifyAccessToken(refreshToken) {
    try {
      // Verificamos el token
      const decoded = jwt.verify(refreshToken, refreshSecretKey);
      console.log("Refresh token decodificado:", decoded);

      // Consultamos los datos del usuario en la base de datos
      const user = await Usuario.findByEmail(decoded.email);
      console.log("Usuario encontrado:", user);
      if (!user || user.refreshToken !== refreshToken) {
      console.log("Token guardado:", user?.refresh_token);
      console.log("Token recibido:", refreshToken);
        return { error: true, code: 403, message: "Token inválido" };
      }

      // Generamos nuevo access token
      const accessToken = this.generateAccessToken(user);
      // Validamos si tenemos que renovar el token de refreso y asignamos el nuevo
      refreshToken = await this.renewAccessToken(refreshToken, user);
      // Retornamos los token
      return {
        error: false,
        code: 201,
        message: "Token actualizado correctamente",
        data: {
          accessToken,
          refreshToken,
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

  //Renovar refreshToken si queda poco tiempo
  static async renewAccessToken(refreshToken, user) {
    let newRefreshToken = "";
    const decoded = jwt.decode(refreshToken, { complete: true });
    // Segundos restantes
    const tiempoRestante = decoded.exp - Math.floor(Date.now() / 1000);
    if (tiempoRestante < 60 * 60 * 24) {
      // Si quedan menos de 24 horas
      newRefreshToken = jwt.sign({ id: decoded.id }, refreshSecretKey, {
        expiresIn: refreshExpiration,
      });
      // Actualizamos el token de refresco en la base de datos
      await Usuario.updateRefreshToken(user.id, newRefreshToken);
    }
    // Si aún es válido, no renueva el token
    return newRefreshToken;
  }

  //Cerrar sesión
  static async logout(userId) {
    await Usuario.updateRefreshToken(userId, null);
    return { error: false, code: 200, message: "Sesión cerrada correctamente" };
  }
}

export default AuthService;
