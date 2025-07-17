import connection from "../utils/db.js";

class Artista {
  // Obtener todos los artistas
  async getAllArtistas() {
    try {
      const [rows] = await connection.query(`
        SELECT artista_id, nombre_artista, url_foto_artista
        FROM artistas
      `);
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los artistas: " + error.message);
    }
  }

  // Obtener un artista por su ID
  async getArtistaById(id) {
    try {
      const [rows] = await connection.query(`
        SELECT artista_id, nombre_artista, biografia, url_foto_artista
        FROM artistas
        WHERE artista_id = ?
      `, [id]);

      if (rows.length === 0) {
        throw new Error("Artista no encontrado");
      }

      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el artista: " + error.message);
    }
  }

  // Artista destacado por cada género
  async getArtistasDestacadosPorGenero() {
    try {
      const [rows] = await connection.query(`
        SELECT 
          gm.genero_id,
          gm.nombre_genero,
          a.artista_id,
          a.nombre_artista,
          a.url_foto_artista
        FROM generos_musicales gm
        JOIN artista_genero ag ON gm.genero_id = ag.genero_id
        JOIN artistas a ON a.artista_id = ag.artista_id
        WHERE (gm.genero_id, a.artista_id) IN (
          SELECT 
            ag2.genero_id,
            MIN(ag2.artista_id)
          FROM artista_genero ag2
          GROUP BY ag2.genero_id
        )
      `);
      return rows;
    } catch (error) {
      throw new Error("Error al obtener artistas destacados por género: " + error.message);
    }
  }

  // Artistas por ID de género
  async getArtistasPorGeneroId(generoId) {
    const [rows] = await connection.query(`
      SELECT 
        a.artista_id,
        a.nombre_artista,
        a.url_foto_artista
      FROM artistas a
      JOIN artista_genero ag ON a.artista_id = ag.artista_id
      JOIN generos_musicales gm ON gm.genero_id = ag.genero_id
      WHERE gm.genero_id = ?
    `, [generoId]);

    return rows;
  }

  // Agregar artista favorito
  async addArtistaFavorito(artistaId, userId) {
    try {
      const [result] = await connection.query(`
        INSERT INTO Favorito_Artista (id_usuario, artista_id)
        VALUES (?, ?)
      `, [artistaId, userId]);

      if (result.affectedRows === 0) {
        throw new Error("No se pudo agregar el artista a favoritos");
      }

      return { message: "Artista agregado a favoritos" };
    } catch (error) {
      throw new Error("Error al agregar artista a favoritos: " + error.message);
    }
  }

  // Obtener artistas favoritos del usuario (ya lo tenías actualizado correctamente)
  async getArtistasFavoritos(userId) {
    try {
      const [rows] = await connection.query(`
        SELECT 
          a.artista_id, 
          a.nombre_artista,
          a.url_foto_artista
        FROM Favorito_Artista fa
        JOIN artistas a ON fa.artista_id = a.artista_id
        WHERE fa.id_usuario = ?
      `, [userId]);

      return rows;
    } catch (error) {
      throw new Error("Error al obtener los artistas favoritos: " + error.message);
    }
  }

  // Eliminar artista favorito
  async eliminarArtistaFavorito(artistaId, userId) {
    try {
      const [result] = await connection.query(`
        DELETE FROM Favorito_Artista
        WHERE artista_id = ? AND id_usuario = ?
      `, [artistaId, userId]);

      if (result.affectedRows === 0) {
        throw new Error("No se pudo eliminar el artista de favoritos");
      }

      return { message: "Artista eliminado de favoritos" };
    } catch (error) {
      throw new Error("Error al eliminar artista de favoritos: " + error.message);
    }
  }

  // Eliminar todos los artistas favoritos
  async eliminarTodosArtistasFavoritos(userId) {
    try {
      const [result] = await connection.query(`
        DELETE FROM Favorito_Artista
        WHERE id_usuario = ?
      `, [userId]);

      if (result.affectedRows === 0) {
        throw new Error("No se pudieron eliminar los artistas favoritos");
      }

      return { message: "Todos los artistas favoritos eliminados" };
    } catch (error) {
      throw new Error("Error al eliminar todos los artistas favoritos: " + error.message);
    }
  }

  // Convertir usuario en artista
  async convertirUsuarioEnArtista(nombreArtista, biografia, urlFotoArtista, userId, generos) {
    try {
      const [existingArtist] = await connection.query(
        "SELECT * FROM artistas WHERE id_usuario = ?",
        [userId]
      );

      if (existingArtist.length > 0) {
        throw new Error("El usuario ya es un artista");
      }

      const [result] = await connection.query(`
        INSERT INTO artistas (nombre_artista, biografia, url_foto_artista, id_usuario)
        VALUES (?, ?, ?, ?)
      `, [nombreArtista, biografia, urlFotoArtista, userId]);

      const artistaId = result.insertId;

      for (const generoId of generos) {
        await connection.query(`
          INSERT INTO artista_genero (artista_id, genero_id)
          VALUES (?, ?)
        `, [artistaId, generoId]);
      }

      return {
        message: "Usuario convertido en artista exitosamente",
        artistaId: result.insertId
      };
    } catch (error) {
      throw new Error("Error al convertir usuario en artista: " + error.message);
    }
  }

  // Actualizar foto del artista
  static async actualizarFotoArtista(artistaId, rutaImagen) {
    const [result] = await connection.query(
      "UPDATE artistas SET url_foto_artista = ? WHERE artista_id = ?",
      [rutaImagen, artistaId]
    );

    if (result.affectedRows === 0) {
      throw new Error("No se encontró el artista para actualizar");
    }

    return result;
  }


  static async getArtistaIdByUsuarioId(userId) {
    const [result] = await connection.query(`
      SELECT artista_id FROM artistas WHERE id_usuario = ?
    `, [userId]);

    if (result.length === 0) {
      throw new Error("No se encontró el artista como usuario");
    }

    return result[0]; 
}

}

export default Artista;
