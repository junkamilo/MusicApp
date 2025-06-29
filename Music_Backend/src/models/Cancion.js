import connection from "../utils/db.js";

class Cancion {
  // Método para obtener todas las canciones
  async getAllCanciones() {
    try {
      const [rows] = await connection.query("SELECT * FROM cancion");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las canciones: " + error.message);
    }
  }

  // Método para obtener una canción por su ID
  async getCancionById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM cancion WHERE cancion_id = ?",
        [id]
      );
      if (rows.length === 0) {
        throw new Error("Canción no encontrada");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener la canción: " + error.message);
    }
  }

  // Método para obtener canciones de un álbum por su ID
  async getCancionesByAlbumId(albumId) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM cancion WHERE album_id = ?",
        [albumId]
      );
      if (rows.length === 0) {
        throw new Error(
          "No se encontraron canciones para el álbum con id: " + albumId
        );
      }
      return rows;
    } catch (error) {
      throw new Error(
        "Error al obtener las canciones del álbum: " + error.message
      );
    }
  }

  // Método para obtener canciones de un artista por su ID
  async getCancionesByArtistaId(artistaId) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM cancion WHERE artista_id = ?",
        [artistaId]
      );
      if (rows.length === 0) {
        throw new Error(
          "No se encontraron canciones para el artista con id: " + artistaId
        );
      }
      return rows;
    } catch (error) {
      throw new Error(
        "Error al obtener las canciones del artista: " + error.message
      );
    }
  }
  // Método para obtener canciones más populares
  async getCancionesMasPopulares() {
    try {
      const [rows] = await connection.query(
        `
      SELECT 
  sub.cancion_id,
  sub.titulo_cancion,
  sub.popularidad,
  sub.genero_id,
  g.nombre_genero,
  sub.album_id,
  sub.titulo_album
FROM (
  SELECT 
    c.cancion_id,
    c.titulo_cancion,
    c.popularidad,
    a.album_id,
    a.titulo_album,
    ag.genero_id,
    ROW_NUMBER() OVER (PARTITION BY ag.genero_id ORDER BY c.popularidad DESC) AS rn
  FROM cancion c
  JOIN album a ON c.album_id = a.album_id
  JOIN artista_genero ag ON a.artista_id = ag.artista_id
) AS sub
JOIN generos_musicales g ON sub.genero_id = g.genero_id
WHERE sub.rn = 1
ORDER BY sub.popularidad DESC;
      `
      );
      return rows;
    } catch (error) {
      throw new Error(
        "Error al obtener las canciones más populares: " + error.message
      );
    }
  }
}

export default Cancion;
