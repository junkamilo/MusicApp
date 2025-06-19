import connection from "../utils/db.js";
class Generos{
    //creamos el metodo para obtener todos los generos
    async getAllGeneros() {
        try {
            // Realizamos la consulta a la base de datos para obtener todos los géneros musicales
            // y devolvemos los resultados
            const [rows] = await connection.query("SELECT * FROM generos_musicales");
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los géneros: " + error.message);
        }
    }

    //creamos el metodo para obtener un genero por su id
    async getGeneroById(id) {
        try {
            // Realizamos la consulta a la base de datos para obtener un género musical por su ID
            const [rows] = await connection.query("SELECT * FROM generos_musicales WHERE genero_id = ?", [id]);
            if (rows.length === 0) {
                throw new Error("Género no encontrado");
            }
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener el género: " + error.message);
        }
    }
}

export default Generos;