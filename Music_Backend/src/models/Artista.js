import connection from "../utils/db.js";
class Artista{
    //metodo para obtener todos los artistas
    async getAllArtistas(){
        try {
            const [rows] = await connection.query("SELECT * FROM artistas");
            return rows;
        } catch (error) {
           throw new Error("Error al obtener los artistas" + error.message);
        }
    }

    //metodo para obtener un artista por su id
    async getArtistaById(id){
        try {
            const [rows] = await connection.query("SELECT * FROM artistas WHERE artista_id = ?", [id]);
            if (rows.length === 0) {
                throw new Error("Artista no encontrado");
            }  
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener el artista: " + error.message);
        }
    }

    // Método para obtener un artista por cada género
async getArtistasDestacadosPorGenero() {
  try {
    const [rows] = await connection.query(`
      SELECT 
        gm.genero_id,
        gm.nombre_genero,
        a.artista_id,
        a.nombre_artista
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

//metodo para obtener artitas con sus respectivos generos musicales
async getArtistasPorGeneroId(generoId) {
  const [rows] = await connection.query(`
    SELECT 
      a.artista_id,
      a.nombre_artista
    FROM artistas a
    JOIN artista_genero ag ON a.artista_id = ag.artista_id
    JOIN generos_musicales gm ON gm.genero_id = ag.genero_id
    WHERE gm.genero_id = ?
  `, [generoId]);

  return rows;
}

//Agregar artitas favoritos de un usuario
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

//Artistas favoritos de un usuario
async getArtistasFavoritos(userId) {
  try {
    const [rows] = await connection.query(`
      SELECT a.artista_id, a.nombre_artista
      FROM Favorito_Artista fa
      JOIN artistas a ON fa.artista_id = a.artista_id
      WHERE fa.id_usuario = ?
    `, [userId]);

    return rows;
  } catch (error) {
    throw new Error("Error al obtener los artistas favoritos: " + error.message);
  }
}
//metodo para eliminar un artista de favoritos
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
//eliminar todos los artistas favoritos de un usuario
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

}
export default Artista;