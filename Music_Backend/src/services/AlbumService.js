import Album from "../models/Album.js";
import path from "path";
import fs from "fs";

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

    //metodo para obtener albumes mas populares por cada genero musical
    static async getAlbumesMasPopularesPorGenero(generoId) {
        try {
            const albumModel = new Album();
            const albumes = await albumModel.getAlbumesPorGeneroId(generoId);
            if (albumes.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: `No se encontraron álbumes para el género con id ${generoId}`
                };
            }
            return {
                error: false,
                code: 200,
                message: "Álbumes populares por género obtenidos correctamente",
                data: albumes
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los álbumes populares por género: " + error.message
            };
        }
    }

    // Método estático para obtener canciones de un álbum por su ID
    static async getCancionesByAlbumId(albumId) {
        try {
            const albumModel = new Album();
            const canciones = await albumModel.getCancionesByAlbumId(albumId);
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
                message: "Canciones obtenidas correctamente",
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
    // Método estático para obtener álbumes destacados
    static async getAlbumesMasPopulares() {
        try {
            const albumModel = new Album();
            const albumes = await albumModel.getAlbumesMasPopulares();
            if (albumes.length === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se encontraron álbumes destacados"
                };
            }
            return {
                error: false,
                code: 200,
                message: "Álbumes destacados obtenidos correctamente",
                data: albumes
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al obtener los álbumes destacados: " + error.message
            };
        }
    }

    // Método estático para obtener álbumes favoritos de un usuario
    static async getAlbumesFavoritosByUserId(userId) {
        try {
            const albumModel = new Album();

            const albumesFavoritos = await albumModel.getAlbumesFavoritosByUserId(userId);
            //retornamos los álbumes favoritos obtenidos
            return {
                error: false,
                code: 200,
                message: "álbumes favoritos obtenidos correctamente",
                data: albumesFavoritos
            };
        } catch (error) {
            //retornamos un error en caso de que ocurra una excepción
            return {
                error: true,
                code: 500,
                message: "Error al obtener los álbumes favoritos del usuario: " + error.message

            };
        }
    }

    // Método estático para agregar un álbum a favoritos
    static async addAlbumToFavorites(userId, albumId) {
        try {
            const albumModel = new Album();
            const result = await albumModel.addAlbumToFavorites(userId, albumId);
            if (result.affectedRows === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se pudo agregar el álbum a favoritos"
                };
            }
            return {
                error: false,
                code: 200,
                message: "Álbum agregado a favoritos correctamente"
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al agregar el álbum a favoritos: " + error.message
            };
        }
    }

    // Método estático para eliminar un álbum de favoritos
    static async removeAlbumFromFavorites(userId, albumId) {
        try {
            const albumModel = new Album();
            const result = await albumModel.removeAlbumFromFavorites(userId, albumId);
            if (result.affectedRows === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se pudo eliminar el álbum de favoritos"
                };
            }
            return {
                error: false,
                code: 200,
                message: "Álbum eliminado de favoritos correctamente"
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al eliminar el álbum de favoritos: " + error.message
            };
        }
    }

    // Método estático para eliminar todos los álbumes favoritos de un usuario
    static async removeAllFavorites(userId) {
        try {
            const albumModel = new Album();
            const result = await albumModel.removeAllFavorites(userId);
            if (result.affectedRows === 0) {
                return {
                    error: true,
                    code: 404,
                    message: "No se pudieron eliminar los álbumes favoritos"
                };
            }
            return {
                error: false,
                code: 200,
                message: "Todos los álbumes favoritos eliminados correctamente"
            };
        } catch (error) {
            return {
                error: true,
                code: 500,
                message: "Error al eliminar todos los álbumes favoritos: " + error.message
            };
        }
    }

    // Método estático para crear un nuevo álbum
static async crearAlbum({ titulo, fecha_lanzamiento,descripcion, url_portada, artista_id }) {
    try {
        const albumModel = new Album();
        const result = await albumModel.crearAlbum({ titulo, fecha_lanzamiento,descripcion, url_portada, artista_id});

        if (!result || !result.album_id) {
            return {
                error: true,
                code: 400,
                message: "No se pudo crear el álbum"
            };
        }

        return {
            error: false,
            code: 201,
            message: "Álbum creado exitosamente",
            data: result
        };
    } catch (error) {
        return {
            error: true,
            code: 500,
            message: "Error al crear el álbum: " + error.message
        };
    }
}

  static async guardarPortadaAlbum(albumId, file) {
    try {
      const ext = path.extname(file.originalname).toLowerCase();
      const permitido = [".jpg", ".jpeg", ".png", ".webp"];

      if (!permitido.includes(ext)) {
        return {
          error: true,
          code: 400,
          message: "La portada debe ser formato JPG, PNG o WebP"
        };
      }

      const nombreFinal = `${Date.now()}-${file.originalname}`;
      const destino = path.join("uploads/imagenes", nombreFinal);
      fs.renameSync(file.path, destino);

      const rutaBD = `/imagenes/${nombreFinal}`;
      await Album.actualizarPortadaAlbum(albumId, rutaBD);

      return {
        error: false,
        code: 200,
        message: "Portada del álbum actualizada correctamente",
        data: {
          albumId,
          url_portada_album: rutaBD
        }
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al guardar la imagen: " + error.message
      };
    }
  }


}

export default AlbumService;