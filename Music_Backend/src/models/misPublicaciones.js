import connection from "../utils/db.js";

class MisPublicacionesModel {
  static async obtenerAlbumesConCancionesPorArtista(artista_id) {
    const [result] = await connection.query(
      `SELECT 
         a.album_id, a.titulo_album, a.fecha_album, a.descripcion AS descripcion_album, a.url_portada_album,
         c.cancion_id, c.titulo_cancion, c.numero_pista, c.url_archivo_audio, c.duracion, c.descripcion AS descripcion_cancion
       FROM album a
       LEFT JOIN cancion c ON a.album_id = c.album_id
       WHERE a.artista_id = ?
       ORDER BY a.album_id, c.numero_pista`
    , [artista_id]);

    return result;
  }

  static async eliminarCancion(cancion_id, artista_id) {
    const [result] = await connection.query(
      `DELETE FROM cancion WHERE cancion_id = ? AND artista_id = ?`,
      [cancion_id, artista_id]
    );
    return result;
  }

  static async eliminarAlbumSiEstaVacio(album_id, artista_id) {
    const [canciones] = await connection.query(
      `SELECT * FROM cancion WHERE album_id = ?`,
      [album_id]
    );
    if (canciones.length > 0) return { error: true, message: "El álbum tiene canciones y no puede eliminarse." };

    await connection.query(
      `DELETE FROM album WHERE album_id = ? AND artista_id = ?`,
      [album_id, artista_id]
    );
    return { error: false, message: "Álbum eliminado correctamente." };
  }

  static async modificarAlbum(album_id, artista_id, datos) {
    const { titulo_album, descripcion, fecha_album } = datos;
    const [result] = await connection.query(
      `UPDATE album SET titulo_album = ?, descripcion = ?, fecha_album = ?
       WHERE album_id = ? AND artista_id = ?`,
      [titulo_album, descripcion, fecha_album, album_id, artista_id]
    );
    return result;
  }

  static async subirCancion(datosCancion, artista_id) {
    const { titulo_cancion, duracion, numero_pista, descripcion, album_id, url_archivo_audio } = datosCancion;
    const [result] = await connection.query(
      `INSERT INTO cancion (titulo_cancion, duracion, numero_pista, descripcion, album_id, artista_id, url_archivo_audio)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [titulo_cancion, duracion, numero_pista, descripcion, album_id, artista_id, url_archivo_audio]
    );
    return result;
  }
}

export default MisPublicacionesModel;