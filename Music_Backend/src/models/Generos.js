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

    //creamos el metodo para obtener los generos favoritos de un usuario
    async getGenerosFavoritosByUserId(userId) {
        try {
            const [rows] = await connection.query(`
            SELECT gm.genero_id, gm.nombre_genero
            FROM Favorito_Genero fg
            JOIN generos_musicales gm ON fg.genero_id = gm.genero_id
            WHERE fg.id_usuario = ?
        `, [userId]);
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los géneros favoritos: " + error.message);
        }
    }

    //creamos el metodo para agregar un genero favorito
    async addGeneroFavorito(userId, generoId) {
        try {
            // Verificamos si el género ya está en favoritos
            const [existing] = await connection.query("SELECT * FROM Favorito_Genero WHERE id_usuario = ? AND genero_id = ?", [userId, generoId]);
            if (existing.length > 0) {
                throw new Error("El género ya está en favoritos");
            }

            // Insertamos el nuevo género favorito
            const result = await connection.query("INSERT INTO Favorito_Genero (id_usuario, genero_id) VALUES (?, ?)", [userId, generoId]);
            return result[0];
        } catch (error) {
            throw new Error("Error al agregar el género favorito: " + error.message);
        }
    }

    //creamos el metodo para eliminar un genero favorito
    async removeGeneroFavorito(userId, generoId) {
        try {
            // Verificamos si el género está en favoritos
            const [existing] = await connection.query("SELECT * FROM Favorito_Genero WHERE id_usuario = ? AND genero_id = ?", [userId, generoId]);
            if (existing.length === 0) {
                throw new Error("El género no está en favoritos");
            }

            // Eliminamos el género favorito
            const result = await connection.query("DELETE FROM Favorito_Genero WHERE id_usuario = ? AND genero_id = ?", [userId, generoId]);
            return result[0];
        } catch (error) {
            throw new Error("Error al eliminar el género favorito: " + error.message);
        }
    }

    //creamos el metodo para eliminar todos los generos favoritos de un usuario
    async removeAllGenerosFavoritos(userId) {
        try {
            // Eliminamos todos los géneros favoritos del usuario
            const result = await connection.query("DELETE FROM Favorito_Genero WHERE id_usuario = ?", [userId]);
            return result[0];
        } catch (error) {
            throw new Error("Error al eliminar los géneros favoritos: " + error.message);
        }
    }
}

export default Generos;