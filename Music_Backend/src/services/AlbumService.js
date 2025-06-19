import Album from "../models/Album.js";

class AlbumService {
    // Método estático para obtener todos los álbumes
    static async getAllAlbumes() {
        try {
            // Creamos una instancia del modelo Album y obtenemos todos los álbumes
            const albumModel = new Album();
            // Llamamos al método getAllAlbumes del modelo
            const albumes = await albumModel.getAllAlbumes();
            // Verificamos si se encontraron álbumes
            if (albumes.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron álbumes"
                };
            }
            return {
                error: false,
                code: 200,
                message: "Álbumes obtenidos correctamente",
                data: albumes
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los álbumes: " + error.message
            };
        }
    }

    // Método estático para obtener un álbum por su ID
    static async getAlbumById(id) {
        try {
            const albumModel = new Album();
            const album = await albumModel.getAlbumById(id);
            return {
                error: false,
                code: 200,
                message: "Álbum obtenido correctamente",
                data: album
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener el álbum: " + error.message
            };
        }
    }

    // Método estático para obtener álbumes de un artista por su ID
    static async getAlbumesByArtistaId(id) {
        try {
            const albumModel = new Album();
            const albumes = await albumModel.getAlbumesByArtistaId(id);
            if (albumes.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron álbumes para el artista con id: " + id
                };
            }
            return {
                error: false,
                code: 200,
                message: "Álbumes obtenidos correctamente",
                data: albumes
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los álbumes del artista: " + error.message
            };
        }
    }
}

export default AlbumService;