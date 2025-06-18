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

    //metodo para obtener las canciones de un album por su id
    async getCancionesByAlbumId(albumId){
        try {
            const [rows] = await connection.query("SELECT * FROM cancion WHERE album_id = ?", [albumId]);
            if (rows.length === 0) {
                throw new Error("No se encontraron canciones para el album con id: " + albumId);
            }
            return rows;
        } catch (error) {
            throw new Error("Error al obtener las canciones del album: " + error.message);
        }
    }

    //metodo para obtener las canciones de un artista por su id
    async getCancionesByArtistaId(artistaId){
        try {
            const [rows] = await connection.query("SELECT c.* FROM cancion c JOIN album a ON c.album_id = a.album_id WHERE a.artista_id = ?", [artistaId]);
            if (rows.length === 0) {
                throw new Error("No se encontraron canciones para el artista con id: " + artistaId);
            }
            return rows;
        } catch (error) {
            throw new Error("Error al obtener las canciones del artista: " + error.message);
        }
    }
}

export default Artista;