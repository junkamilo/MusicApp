import connection from "../utils/db.js";


class AudioModel {

  static async crearCancion(datos) {
    const { titulo, duracion, numero_pista, descripcion, album_id, artista_id } = datos;

    const [result] = await connection.query(
      `INSERT INTO cancion (titulo_cancion, duracion, numero_pista, descripcion, album_id, artista_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [titulo, duracion, numero_pista, descripcion, album_id, artista_id]
    );

    return result.insertId;
  }


  // Método para actualizar la ruta del archivo de audio
  static async actualizarRutaAudio(cancionId, ruta) {
    const [result] = await connection.query(
      "UPDATE cancion SET url_archivo_audio = ? WHERE cancion_id = ?",
      [ruta, cancionId]
    );

    if (result.affectedRows === 0) {
      throw new Error("No se encontró la canción para actualizar");
    }

    return result;
  }
}

export default AudioModel;



