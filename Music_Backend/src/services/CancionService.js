import Cancion from '../models/Cancion.js';

class CancionService {
    // Método estático para obtener todas las canciones
    static async getAllCanciones() {
        try {
            // Creamos una instancia del modelo Cancion y obtenemos todas las canciones
            // Llamamos al método getAllCanciones del modelo
            const cancionModel = new Cancion();
            const canciones = await cancionModel.getAllCanciones();
            if (canciones.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron canciones"
                };
            }
            return {
                error: false,
                code: 200,
                message: "Canciones obtenidas correctamente",
                data: canciones
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener las canciones: " + error.message
            };
        }
    }

    // Método estático para obtener una canción por su ID
    static async getCancionById(id) {
        try {
            // Creamos una instancia del modelo Cancion y obtenemos una canción por su ID
            // Llamamos al método getCancionById del modelo
            const cancionModel = new Cancion();
            const cancion = await cancionModel.getCancionById(id);
            return {
                error: false,
                code: 200,
                message: "Canción obtenida correctamente",
                data: cancion
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener la canción: " + error.message
            };
        }
    }

    // Método estático para obtener canciones de un álbum por su ID
    static async getCancionesByAlbumId(albumId) {
        try {
            // Creamos una instancia del modelo Cancion y obtenemos las canciones de un álbum por su ID
            // Llamamos al método getCancionesByAlbumId del modelo
            const cancionModel = new Cancion();
            const canciones = await cancionModel.getCancionesByAlbumId(albumId);
            if (canciones.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron canciones para el álbum con id: " + albumId
                };
            }
            return {
                error: false,
                code: 200,
                message: "Canciones del álbum obtenidas correctamente",
                data: canciones
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener las canciones del álbum: " + error.message
            };
        }
    }

    // Método estático para obtener canciones de un artista por su ID
    static async getCancionesByArtistaId(artistaId) {
        try {
            // Creamos una instancia del modelo Cancion y obtenemos las canciones de un artista por su ID
            // Llamamos al método getCancionesByArtistaId del modelo
            const cancionModel = new Cancion();
            const canciones = await cancionModel.getCancionesByArtistaId(artistaId);
            if (canciones.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron canciones para el artista con id: " + artistaId
                };
            }
            return {
                error: false,
                code: 200,
                message: "Canciones del artista obtenidas correctamente",
                data: canciones
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener las canciones del artista: " + error.message
            };
        }
    }
}

export default CancionService;