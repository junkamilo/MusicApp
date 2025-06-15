import connection from "../utils/db.js";
class Artista{
    async getAllArtistas(){
        try {
            const [rows] = await connection.query("SELECT * FROM artistas");
            return rows;
        } catch (error) {
           throw new Error("Error al obtener los artistas" + error.message);
        }
    }
}

export default Artista;