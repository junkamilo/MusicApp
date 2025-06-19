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
}

export default Artista;