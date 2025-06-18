import Artista from "../models/Artista.js";

class ArtistasService {
    //métodos estáticos para interactuar con el modelo Artista
    //obtenemos todos los artistas
    static async getAllArtistas() {
        try {
            //creamos la instancia del modelo Artista
            const OBJArtista = new Artista();
            //llamamos al método getAllArtistas del modelo
            const artistas = await OBJArtista.getAllArtistas();
            //validamos si no hay artistas
            if (artistas.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron artistas"
                 };
            }

            //retornamos los artistas obtenidos
            return {
                error: false,
                code: 200,
                message: "Artistas obtenidos correctamente",
                data: artistas
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al obtener los artistas: " + error.message
            };
        }
    }

    //métodos estáticos para interactuar con el modelo Artista
    //obtenemos un artista por su id
    static async getArtistaById(id) {
        try {
            //creamos la instancia del modelo Artista
            const OBJArtista = new Artista();
            //llamamos al método getArtistaById del modelo
            const artista = await OBJArtista.getArtistaById(id);
            //retornamos el artista obtenido
            return {
                error: false,
                code: 200,
                message: "Artista obtenido correctamente",
                data: artista
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al obtener el artista: " + error.message
            };
        }
    }

    //métodos estáticos para interactuar con el modelo Artista
    //obtenemos los albumes de un artista por su id
    static async getAlbumesByArtistaId(id) {
        try {
            //creamos la instancia del modelo Artista
            const OBJArtista = new Artista();
            //llamamos al método getAlbumesByArtistaId del modelo
            const albumes = await OBJArtista.getAlbumesByArtistaId(id);
            //validamos si no hay albumes
            if (albumes.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron albumes para el artista con id: " + id
                };
            }
            //retornamos los albumes obtenidos
            return {
                error: false,
                code: 200,
                message: "Albumes obtenidos correctamente",
                data: albumes
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al obtener los albumes del artista: " + error.message
            };
        }
    }

    //métodos estáticos para interactuar con el modelo Artista
    //obtenemos las canciones de un album por su id
    static async getCancionesByAlbumId(albumId) {
        try {
            //creamos la instancia del modelo Artista
            const OBJArtista = new Artista();
            //llamamos al método getCancionesByAlbumId del modelo
            const canciones = await OBJArtista.getCancionesByAlbumId(albumId);
            //validamos si no hay canciones
            if (canciones.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron canciones para el album con id: " + albumId
                };
            }
            //retornamos las canciones obtenidas
            return {
                error: false,
                code: 200,
                message: "Canciones obtenidas correctamente",
                data: canciones
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al obtener las canciones del album: " + error.message
            };
        }
    }
    //métodos estáticos para interactuar con el modelo Artista
    //obtenemos las canciones de un artista por su id
    static async getCancionesByArtistaId(artistaId) {
        try {
            //creamos la instancia del modelo Artista
            const OBJArtista = new Artista();
            //llamamos al método getCancionesByArtistaId del modelo
            const canciones = await OBJArtista.getCancionesByArtistaId(artistaId);
            //validamos si no hay canciones
            if (canciones.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron canciones para el artista con id: " + artistaId
                };
            }
            //retornamos las canciones obtenidas
            return {
                error: false,
                code: 200,
                message: "Canciones obtenidas correctamente",
                data: canciones
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al obtener las canciones del artista: " + error.message
            };
        }
    }
}

export default ArtistasService;