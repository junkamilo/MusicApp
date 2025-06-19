import Generos from "../models/Generos.js";

class GenerosService {
    // Método para obtener todos los géneros musicales
    static async getAllGeneros() {
        try {
            // Creamos una instancia del modelo Generos y obtenemos todos los géneros
            const generosModel = new Generos();
            // Llamamos al método getAllGeneros del modelo
            // y devolvemos los resultados
            const generos = await generosModel.getAllGeneros();
            return { code: 200, data: generos };
        } catch (error) {
            return { code: 500, error: true, message: "Error al obtener los géneros: " + error.message };
        }
    }

    // Método para obtener un género musical por su ID
    static async getGeneroById(id) {
        try {
            // Creamos una instancia del modelo Generos y obtenemos un género por su ID
            const generosModel = new Generos();
            // Llamamos al método getGeneroById del modelo
            // y devolvemos el resultado
            const genero = await generosModel.getGeneroById(id);
            return { code: 200, data: genero };
        } catch (error) {
            return { code: 404, error: true, message: "Género no encontrado: " + error.message };
        }
    }
}

export default GenerosService;