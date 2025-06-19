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
}

export default Album;