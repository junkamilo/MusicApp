import db from "../utils/db.js";

export class Usuario {
  // Buscar usuario por email
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM Usuarios WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  // Crear nuevo usuario
  static async create(nombre, email, hashedPassword) {
    console.log(nombre, email, hashedPassword);
    const [result] = await db.query(
      "INSERT INTO Usuarios (nombre, email, contrasena) VALUES (?, ?, ?)",
      [nombre, email, hashedPassword]
    );
    return result.insertId; // Devuelve el ID del nuevo usuario
  }

  // Actualizar token de sesión (refresh_token)
  static async updateRefreshToken(id, refreshToken) {
    await db.query(
      "UPDATE Usuarios SET refreshToken = ? WHERE id_usuario = ?",
      [refreshToken, id]
    );
  }

  // Obtener usuario por ID
  static async findById(id_usuario) {
    const [rows] = await db.query(
      "SELECT * FROM Usuarios WHERE id_usuario = ?",
      [id_usuario]
    );
    return rows[0];
  }

  //informacion de usuario
  static async getUserInfo(id_usuario) {
  const [rows] = await db.query(
    `
    SELECT 
      u.nombre,
      u.email,
      u.fecha_registro,
      u.url_foto_perfil,
      a.artista_id,
      CASE 
        WHEN a.artista_id IS NOT NULL THEN 'artista'
        ELSE 'usuario'
      END AS rol
    FROM Usuarios u
    LEFT JOIN artistas a ON u.id_usuario = a.id_usuario
    WHERE u.id_usuario = ?
    `,
    [id_usuario]
  );
    return rows[0];
  }

  // Actualizar información del usuario
  static async updateUserInfo(id_usuario, nombre, email) {
    await db.query(
      "UPDATE Usuarios SET nombre = ?, email = ? WHERE id_usuario = ?",
      [nombre, email, id_usuario]
    );
  }

  //verificamos si el email ya existe
  static async emailExists(email, excludeUserId = null) {
    const [result] = await db.query(
      `SELECT id_usuario FROM Usuarios WHERE email = ? ${
        excludeUserId ? "AND id_usuario != ?" : ""
      }`,
      excludeUserId ? [email, excludeUserId] : [email]
    );
    return result.length > 0;
  }
  // Obtener todos los usuarios
  static async findById(id_usuario) {
    const [result] = await db.query("SELECT * FROM Usuarios WHERE id_usuario = ?", [id_usuario]);
    return result[0];
}

  // Actualizar contraseña del usuario
static async updatePassword(id_usuario, hashedPassword) {
    await db.query("UPDATE Usuarios SET contrasena = ? WHERE id_usuario = ?", [
        hashedPassword,
        id_usuario,
    ]);
}
}
