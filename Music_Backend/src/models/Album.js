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
      const [rows] = await connection.query(
      `
      SELECT 
        a.album_id,
        a.titulo_album,
        a.fecha_album,
        a.descripcion,
        a.url_portada_album,
        a.popularidad,
        a.artista_id,
        ar.nombre_artista
      FROM album a
      JOIN artistas ar ON a.artista_id = ar.artista_id
      WHERE a.album_id = ?
      `,
      [id]
    );
      if (rows.length === 0) {
        throw new Error("Álbum no encontrado");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener el álbum: " + error.message);
    }
  }

  //metodo para obtener albumes de un artista por su id
  async getAlbumesByArtistaId(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM album WHERE artista_id = ?",
        [id]
      );
      if (rows.length === 0) {
        throw new Error(
          "No se encontraron albumes para el artista con id: " + id
        );
      }
      return rows;
    } catch (error) {
      throw new Error(
        "Error al obtener los albumes del artista: " + error.message
      );
    }
  }

  //metodo para obtener albumes mas populares de cada genero
  async getAlbumesPorGeneroId(generoId) {
    try {
      const [rows] = await connection.query(
        `
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
      WHERE gm.genero_id = ?
      ORDER BY al.popularidad DESC
      LIMIT 6;
    `,
        [generoId]
      );
      if (rows.length === 0) {
        throw new Error(
          "No se encontraron canciones para el álbum con id: " + generoId
        );
      }
      return rows;
    } catch (error) {
      throw new Error(
        "Error al obtener los álbumes por género: " + error.message
      );
    }
  }

  //metodo para obtener albumes mas populares
  async getAlbumesMasPopulares() {
    try {
      const [rows] = await connection.query(
        `
      SELECT 
        a.album_id, 
        a.titulo_album, 
        a.popularidad, 
        a.genero_id, 
        g.nombre_genero
      FROM (
        SELECT 
          al.album_id, 
          al.titulo_album, 
          al.popularidad, 
          ag.genero_id,
          ROW_NUMBER() OVER (PARTITION BY ag.genero_id ORDER BY al.popularidad DESC) AS rn
        FROM album al
        JOIN artista_genero ag ON al.artista_id = ag.artista_id
      ) a
      JOIN generos_musicales g ON a.genero_id = g.genero_id
      WHERE a.rn = 1
      ORDER BY a.popularidad DESC
      LIMIT 6;
      `
      );
      if (rows.length === 0) {
        throw new Error("No se encontraron álbumes populares");
      }
      return rows;
    } catch (error) {
      throw new Error(
        "Error al obtener los álbumes populares: " + error.message
      );
    }
  }

  //metodo para obtener cacniones de un album por su id
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

  //metodo para obtener albumes favoritos de un usuario
async getAlbumesFavoritosByUserId(userId) {
  try {
    const [rows] = await connection.query(
      `
      SELECT 
        a.album_id,
        a.titulo_album,
        a.url_portada_album,
        ar.artista_id,
        ar.nombre_artista
      FROM Favorito_Album fa
      JOIN album a ON fa.album_id = a.album_id
      JOIN artistas ar ON a.artista_id = ar.artista_id
      WHERE fa.id_usuario = ?;
      `,
      [userId]
    );

    return rows;
    
  } catch (error) {
    // Este catch ahora solo captura errores de SQL u otros
    throw new Error("Error al obtener los álbumes favoritos del usuario: " + error.message);
  }
}


  // Método para agregar un álbum a favoritos
  async addAlbumToFavorites(userId, albumId) {
    try {
      const [result] = await connection.query(
        "INSERT INTO Favorito_Album (id_usuario, album_id) VALUES (?, ?)",
        [userId, albumId]
      );
      if (result.affectedRows === 0) {
        throw new Error("No se pudo agregar el álbum a favoritos");
      }
      return { affectedRows: result.affectedRows, message: "Álbum agregado a favoritos exitosamente" };
    } catch (error) {
      throw new Error("Error al agregar el álbum a favoritos: " + error.message);
    }
  }

  // Método para eliminar un álbum de favoritos
  async removeAlbumFromFavorites(userId, albumId) {
    try {
      const [result] = await connection.query(
        "DELETE FROM Favorito_Album WHERE id_usuario = ? AND album_id = ?",
        [userId, albumId]
      );
      if (result.affectedRows === 0) {
        throw new Error("No se pudo eliminar el álbum de favoritos");
      }
      return { affectedRows: result.affectedRows, message: "Álbum eliminado de favoritos exitosamente" };
    } catch (error) {
      throw new Error(
        "Error al eliminar el álbum de favoritos: " + error.message
      );
    }
  }

  // Método para eliminar todos los álbumes favoritos de un usuario
  async removeAllFavorites(userId) {
    try {
      const [result] = await connection.query(
        "DELETE FROM Favorito_Album WHERE id_usuario = ?",
        [userId]
      );
      if (result.affectedRows === 0) {
        throw new Error("No se pudieron eliminar los álbumes favoritos");
      }
      return { affectedRows: result.affectedRows, message: "Álbumes eliminados de favoritos exitosamente" };
    } catch (error) {
      throw new Error(
        "Error al eliminar todos los álbumes favoritos: " + error.message
      );
    }
  }

  //metodo para crear un album
async crearAlbum({ titulo, fecha_lanzamiento,descripcion, url_portada, artista_id }) {
  try {
    const [result] = await connection.query(
      `INSERT INTO album (titulo_album,fecha_album, descripcion, url_portada_album, artista_id)
       VALUES (?, ?, ?, ?, ?)`,
      [titulo, fecha_lanzamiento, descripcion, url_portada, artista_id]
    );

    if (result.affectedRows === 0) {
      throw new Error("No se pudo crear el álbum");
    }

    return {
      album_id: result.insertId,
      message: "Álbum creado exitosamente"
    };
  } catch (error) {
    throw new Error("Error al crear el álbum: " + error.message);
  }
}

//actualizar foto album
  static async actualizarPortadaAlbum(albumId, rutaImagen) {
    const [result] = await connection.query(
      "UPDATE album SET url_portada_album = ? WHERE album_id = ?",
      [rutaImagen, albumId]
    );

    if (result.affectedRows === 0) {
      throw new Error("No se encontró el álbum para actualizar");
    }

    return result;
  }


}

export default Album;
