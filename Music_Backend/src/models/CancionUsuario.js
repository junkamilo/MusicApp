import connection from "../utils/db.js";


class CancionUsuarioModel {
  static async crearCancion({ id_usuario, titulo, duracion, url_archivo_audio }) {
    const [result] = await connection.query(
      `INSERT INTO CancionesUsuarios (id_usuario, titulo, duracion, url_archivo_audio)
       VALUES (?, ?, ?, ?)`,
      [id_usuario, titulo, duracion, url_archivo_audio]
    );

    return {
      id_cancion_usuario: result.insertId,
      id_usuario,
      titulo,
      duracion,
      url_archivo_audio
    };
  }

    static async obtenerCancionesPorUsuario(id_usuario) {
    const [rows] = await connection.query(
      `SELECT * FROM CancionesUsuarios WHERE id_usuario = ?`,
      [id_usuario]
    );
    return rows;
  }

// Obtener canción por ID
static async obtenerCancionPorId(id_cancion_usuario) {
  const [rows] = await connection.query(
    `SELECT * FROM CancionesUsuarios WHERE id_cancion_usuario = ?`,
    [id_cancion_usuario]
  );
  return rows[0];
}

// Eliminar canción solo si pertenece al usuario
static async eliminarCancion(id_cancion_usuario, id_usuario) {
  // Verificar propiedad
  const cancion = await this.obtenerCancionPorId(id_cancion_usuario);
  if (!cancion) {
    throw new Error("La canción no existe.");
  }
  if (cancion.id_usuario !== id_usuario) {
    throw new Error("No tienes permiso para eliminar esta canción.");
  }

  const [result] = await connection.query(
    `DELETE FROM CancionesUsuarios WHERE id_cancion_usuario = ?`,
    [id_cancion_usuario]
  );

  if (result.affectedRows === 0) {
    throw new Error("Error al eliminar la canción.");
  }

  return { message: "Canción eliminada exitosamente." };
}
}

export default CancionUsuarioModel;
