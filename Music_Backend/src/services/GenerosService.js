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

    // Método para obtener los géneros favoritos de un usuario
    static async getGenerosFavoritosByUserId(userId) {
        try {
            // Creamos una instancia del modelo Generos y obtenemos los géneros favoritos de un usuario
            const generosModel = new Generos();
            // Llamamos al método getGenerosFavoritosByUserId del modelo
            // y devolvemos los resultados
            const generosFavoritos = await generosModel.getGenerosFavoritosByUserId(userId);
            return { code: 200, data: generosFavoritos };
        } catch (error) {
            return { code: 500, error: true, message: "Error al obtener los géneros favoritos: " + error.message };
        }
    }

    // Método para agregar un género favorito
    static async addGeneroFavorito(userId, generoId) {
        try {
            // Creamos una instancia del modelo Generos y agregamos un género favorito
            const generosModel = new Generos();
            // Llamamos al método addGeneroFavorito del modelo
            // y devolvemos el resultado
            const result = await generosModel.addGeneroFavorito(userId, generoId);
            return { code: 201, data: result };
        } catch (error) {
            return { code: 400, error: true, message: "Error al agregar el género favorito: " + error.message };
        }
    }

    // Método para eliminar un género favorito
    static async removeGeneroFavorito(userId, generoId) {
        try {
            // Creamos una instancia del modelo Generos y eliminamos un género favorito
            const generosModel = new Generos();
            // Llamamos al método removeGeneroFavorito del modelo
            // y devolvemos el resultado
            const result = await generosModel.removeGeneroFavorito(userId, generoId);
            return { code: 200, data: result };
        } catch (error) {
            return { code: 400, error: true, message: "Error al eliminar el género favorito: " + error.message };
        }
    }

    // Método para eliminar todos los géneros favoritos de un usuario
    static async removeAllGenerosFavoritos(userId) {
        try {
            // Creamos una instancia del modelo Generos y eliminamos todos los géneros favoritos
            const generosModel = new Generos();
            // Llamamos al método removeAllGenerosFavoritos del modelo
            // y devolvemos el resultado
            const result = await generosModel.removeAllGenerosFavoritos(userId);
            return { code: 200, data: result };
        } catch (error) {
            return { code: 400, error: true, message: "Error al eliminar los géneros favoritos: " + error.message };
        }
    }
}

export default GenerosService;