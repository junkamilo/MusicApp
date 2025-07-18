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

  //metodo para obtener canciones de cada album por cada genero musical
  async getCancionesAlbumGenero(generoId) {
    try {
      const [rows] = await connection.query(
        `
      SELECT 
  final.cancion_id,
  final.titulo_cancion,
  final.album_id,
  final.titulo_album,
  final.genero_id,
  final.nombre_genero,
  final.artista_id,
  final.nombre_artista,
  final.popularidad,
  final.url_archivo_audio,
  final.url_portada_album
FROM (
  SELECT 
    c.cancion_id,
    c.titulo_cancion,
    c.album_id,
    c.titulo_album,
    c.genero_id,
    g.nombre_genero,
    a.artista_id,
    a.nombre_artista,
    c.popularidad,
    c.url_archivo_audio,
    c.url_portada_album,
    ROW_NUMBER() OVER (PARTITION BY a.artista_id ORDER BY c.popularidad DESC) AS rn_artista
  FROM (
    SELECT 
      can.cancion_id,
      can.titulo_cancion,
      can.album_id,
      al.titulo_album,
      cg.genero_id,
      can.popularidad,
      ar.artista_id,
      can.url_archivo_audio,
      al.url_portada_album AS url_portada_album,
      ROW_NUMBER() OVER (PARTITION BY can.album_id ORDER BY can.popularidad DESC) AS rn_album
    FROM cancion can
    JOIN album al ON can.album_id = al.album_id
    JOIN artistas ar ON al.artista_id = ar.artista_id
    JOIN cancion_genero cg ON can.cancion_id = cg.cancion_id
    WHERE cg.genero_id = ?
  ) AS c
  JOIN generos_musicales g ON c.genero_id = g.genero_id
  JOIN artistas a ON c.artista_id = a.artista_id
  WHERE c.rn_album = 1
) AS final
WHERE final.rn_artista = 1
ORDER BY final.popularidad DESC;
      `,
      [generoId]
      );
      return rows;
    } catch (error) {
      throw new Error(
        "Error al obtener las canciones más populares: " + error.message
      );
    }
  }

  //metodo para obtener las canciones favoritas de un usuario
  async getCancionesFavoritosByUserId(userId) {
  try {
    const [rows] = await connection.query(
      `
      SELECT 
    c.cancion_id,
    c.titulo_cancion,
    c.duracion,
    c.numero_pista,
    c.reproducciones,
    al.album_id,
    al.titulo_album,
    al.url_portada_album,
    ar.artista_id,
    ar.nombre_artista
FROM Favorito_Cancion fc
JOIN cancion c ON fc.cancion_id = c.cancion_id
JOIN album al ON c.album_id = al.album_id
JOIN artistas ar ON al.artista_id = ar.artista_id
WHERE fc.id_usuario = ?;
      `,
      [userId]
    );

    return rows;
    
  } catch (error) {
    // Este catch ahora solo captura errores de SQL u otros
    throw new Error("Error al obtener los álbumes favoritos del usuario: " + error.message);
  }
}

// Método para agregar un cancion a favoritos
  async addCancionToFavorites(userId, cancionId) {
    try {
      const [result] = await connection.query(
        "INSERT INTO Favorito_Cancion (id_usuario, cancion_id) VALUES (?, ?)",
        [userId, cancionId]
      );
      if (result.affectedRows === 0) {
        throw new Error("No se pudo agregar la cancion a favoritos");
      }
      return { affectedRows: result.affectedRows, message: "Canción agregada a favoritos exitosamente" };
    } catch (error) {
      throw new Error("Error al agregar la cancion a favoritos: " + error.message);
    }
  }

  // Método para eliminar una canción de favoritos
    async removeCancionFromFavorites(userId, cancionId) {
    try {
      const [result] = await connection.query(
        "DELETE FROM Favorito_Cancion WHERE id_usuario = ? AND cancion_id = ?",
        [userId, cancionId]
      );
      if (result.affectedRows === 0) {
        throw new Error("No se pudo eliminar la cancion de favoritos");
      }
      return { affectedRows: result.affectedRows, message: "Canción eliminada de favoritos exitosamente" };
    } catch (error) {
      throw new Error(
        "Error al eliminar la cancion de favoritos: " + error.message
      );
    }
  }

  // Método para eliminar todas las canciones favoritas de un usuario
    async removeAllFavorites(userId) {
    try {
      const [result] = await connection.query(
        "DELETE FROM Favorito_Cancion WHERE id_usuario = ?",
        [userId]
      );
      if (result.affectedRows === 0) {
        throw new Error("No se pudieron eliminar las canciones favoritas");
      }
      return { affectedRows: result.affectedRows, message: "Canciones eliminadas de favoritos exitosamente" };
    } catch (error) {
      throw new Error(
        "Error al eliminar todas las canciones favoritas: " + error.message
      );
    }
  }

   // Insertar múltiples canciones
  async insertarVariasCanciones(canciones) {
    try {
      const values = canciones.map(c => [
        c.titulo_cancion,
        c.duracion,
        c.numero_pista,
        c.reproducciones || 0,
        c.album_id,
        c.artista_id,
        c.descripcion
      ]);

      const [result] = await connection.query(
        `INSERT INTO cancion 
        (titulo_cancion, duracion, numero_pista, reproducciones, album_id, artista_id, descripcion) 
        VALUES ?`,
        [values]
      );

      return {
        affectedRows: result.affectedRows,
        message: "Canciones insertadas correctamente"
      };
    } catch (error) {
      throw new Error("Error al insertar canciones: " + error.message);
    }
  }
}

export default Cancion;
