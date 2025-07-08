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

    //metodo para obtener artistas destacados por género
    static async getArtistasDestacadosPorGenero() {
        try {
            //creamos la instancia del modelo Artista
            const OBJArtista = new Artista();
            //llamamos al método getArtistasDestacadosPorGenero del modelo
            const artistasDestacados = await OBJArtista.getArtistasDestacadosPorGenero();
            //validamos si no hay artistas destacados
            if (artistasDestacados.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron artistas destacados por género"
                };
            }
            //retornamos los artistas destacados obtenidos
            return {
                error: false,
                code: 200,
                message: "Artistas destacados por género obtenidos correctamente",
                data: artistasDestacados
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al obtener los artistas destacados por género: " + error.message
            };
        }
    }

    //método para obtener artistas por género
    static async getArtistasPorGeneroId(generoId) {
        try {
            //creamos la instancia del modelo Artista
            const OBJArtista = new Artista();
            //llamamos al método getArtistasPorGeneroId del modelo
            const artistasPorGenero = await OBJArtista.getArtistasPorGeneroId(generoId);
            //validamos si no hay artistas por género
            if (artistasPorGenero.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron artistas para el género con id: " + generoId
                };
            }
            //retornamos los artistas por género obtenidos
            return {
                error: false,
                code: 200,
                message: "Artistas por género obtenidos correctamente",
                data: artistasPorGenero
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al obtener los artistas por género: " + error.message
            };
        }
    }

    //metodo para agregar artistas a favoritos de un usuario
    static async addArtistaFavorito(userId, artistaId) {
        try {
            //creamos la instancia del modelo Artista
            const OBJArtista = new Artista();
            //llamamos al método addArtistaFavorito del modelo
            const result = await OBJArtista.addArtistaFavorito(userId, artistaId);
            //retornamos el resultado de la operación
            return {
                error: false,
                code: 201,
                message: "Artista agregado a favoritos correctamente",
                data: result
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al agregar el artista a favoritos: " + error.message
            };
        }
    }

    //método para obtener los artistas favoritos de un usuario
    static async getArtistasFavoritos(userId) {
        try {
            //creamos la instancia del modelo Artista
            const OBJArtista = new Artista();
            //llamamos al método getArtistasFavoritos del modelo
            const artistasFavoritos = await OBJArtista.getArtistasFavoritos(userId);
            //validamos si no hay artistas favoritos
            if (artistasFavoritos.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron artistas favoritos para el usuario con id: " + userId
                };
            }
            //retornamos los artistas favoritos obtenidos
            return {
                error: false,
                code: 200,
                message: "Artistas favoritos obtenidos correctamente",
                data: artistasFavoritos
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al obtener los artistas favoritos: " + error.message
            };
        }
    }
    //método para eliminar un artista de favoritos
    static async eliminarArtistaFavorito(artistaId, userId) {
        try {
            //creamos la instancia del modelo Artista
            const OBJArtista = new Artista();
            //llamamos al método eliminarArtistaFavorito del modelo
            const result = await OBJArtista.eliminarArtistaFavorito(artistaId, userId);
            //retornamos el resultado de la operación
            return {
                error: false,
                code: 200,
                message: "Artista eliminado de favoritos correctamente",
                data: result
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al eliminar el artista de favoritos: " + error.message
            };
        }
    }
    //método para eliminar todos los artistas favoritos de un usuario
    static async eliminarTodosArtistasFavoritos(userId) {
        try {
            //creamos la instancia del modelo Artista
            const OBJArtista = new Artista();
            //llamamos al método eliminarTodosArtistasFavoritos del modelo
            const result = await OBJArtista.eliminarTodosArtistasFavoritos(userId);
            //retornamos el resultado de la operación
            return {
                error: false,
                code: 200,
                message: "Todos los artistas favoritos eliminados correctamente",
                data: result
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al eliminar todos los artistas favoritos: " + error.message
            };
        }
    }
}

export default ArtistasService;