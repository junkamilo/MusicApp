import connection from "../utils/db.js";

class Album {
    // Método para obtener todos los álbumes
    async getAllAlbumes() {
        try {
            const [rows] = await connection.query("SELECT * FROM album");
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los álbumes: " + error.message);
        }
    }

    // Método para obtener un álbum por su ID
    async getAlbumById(id) {
        try {
            const [rows] = await connection.query("SELECT * FROM album WHERE album_id = ?", [id]);
            if (rows.length === 0) {
                throw new Error("Álbum no encontrado");
            }
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener el álbum: " + error.message);
        }
    }

    //metodo para obtener albumes de un artista por su id
    async getAlbumesByArtistaId(id){
        try {
            const [rows] = await connection.query("SELECT * FROM album WHERE artista_id = ?", [id]);
            if (rows.length === 0) {
                throw new Error("No se encontraron albumes para el artista con id: " + id);
            }
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los albumes del artista: " + error.message);
        }
    }

    //metodo para obtener albumes mas populares de cada genero
    async getAlbumesPorGeneroId(generoId) {
    const [rows] = await connection.query(`
      SELECT 
        gm.genero_id,
        gm.nombre_genero,
        al.album_id,
        al.titulo_album,
        al.popularidad,
        ar.nombre_artista
      FROM generos_musicales gm
      JOIN artista_genero ag ON gm.genero_id = ag.genero_id
      JOIN artistas ar ON ar.artista_id = ag.artista_id
      JOIN album al ON al.artista_id = ar.artista_id
      WHERE gm.genero_id = 1
      ORDER BY al.popularidad DESC;
    `, [generoId]);
    return rows;
  }
  //metodo para obtener cacniones de un album por su id
  async getCancionesByAlbumId(albumId) {
    try {
      const [rows] = await connection.query("SELECT * FROM cancion WHERE album_id = ?", [albumId]);
      if (rows.length === 0) {
        throw new Error("No se encontraron canciones para el álbum con id: " + albumId);
      }
      return rows;
    } catch (error) {
      throw new Error("Error al obtener las canciones del álbum: " + error.message);
    }
  }
}

export default Album;