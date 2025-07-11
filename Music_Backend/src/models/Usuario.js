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
    return result.insertId;// Devuelve el ID del nuevo usuario
  }

  // Actualizar token de sesión (refresh_token)
  static async updateRefreshToken(id, refreshToken) {
    await db.query("UPDATE Usuarios SET refreshToken = ? WHERE id_usuario = ?", [
      refreshToken,
      id,
    ]);
  }

// Obtener usuario por ID
  static async findById(id_usuario) {
    const [rows] = await db.query("SELECT * FROM Usuarios WHERE id_usuario = ?", [id_usuario]);
    return rows[0];
  }

  //informacion de usuario
  static async getUserInfo(id_usuario) {
    const [rows] = await db.query("SELECT nombre, email, fecha_registro, url_foto_perfil FROM Usuarios WHERE id_usuario = ?", [id_usuario]);
    return rows[0];
  }
}