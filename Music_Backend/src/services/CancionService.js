import Cancion from "../models/Cancion.js";

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
          message: "No se encontraron canciones",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Canciones obtenidas correctamente",
        data: canciones,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las canciones: " + error.message,
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
        data: cancion,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener la canción: " + error.message,
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
          message:
            "No se encontraron canciones para el álbum con id: " + albumId,
        };
      }
      return {
        error: false,
        code: 200,
        message: "Canciones del álbum obtenidas correctamente",
        data: canciones,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las canciones del álbum: " + error.message,
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
          message:
            "No se encontraron canciones para el artista con id: " + artistaId,
        };
      }
      return {
        error: false,
        code: 200,
        message: "Canciones del artista obtenidas correctamente",
        data: canciones,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las canciones del artista: " + error.message,
      };
    }
  }
  // Método estático para obtener canciones más populares
  static async getCancionesMasPopulares() {
    try {
      // Creamos una instancia del modelo Cancion y obtenemos las canciones más populares
      // Llamamos al método getCancionesMasPopulares del modelo
      const cancionModel = new Cancion();
      const canciones = await cancionModel.getCancionesMasPopulares();
      if (canciones.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No se encontraron canciones populares",
        };
      }
      return {
        error: false,
        code: 200,
        message: "Canciones populares obtenidas correctamente",
        data: canciones,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las canciones populares: " + error.message,
      };
    }
  }
  // Método estático para obtener canciones de album por genero
  static async getCancionesAlbumGenero(generoId) {
    try {
      // Creamos una instancia del modelo Cancion y obtenemos las canciones de un género por su ID
      // Llamamos al método getCancionesByGenero del modelo
      const cancionModel = new Cancion();
      const canciones = await cancionModel.getCancionesAlbumGenero(generoId);
      if (canciones.length === 0) {
        return {
          error: true,
          code: 404,
          message:
            "No se encontraron canciones para el género con id: " + generoId,
        };
      }
      return {
        error: false,
        code: 200,
        message: "Canciones del género obtenidas correctamente",
        data: canciones,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener las canciones del género: " + error.message,
      };
    }
  }

  //metodo para agregar canciones a favoritos de un usuario
  static async addCancionToFavorites(userId, cancionId) {
    try {
      //creamos la instancia del modelo Artista
      const OBJCancion = new Cancion();
      //llamamos al método addArtistaFavorito del modelo
      const result = await OBJCancion.addCancionToFavorites(userId, cancionId);
      //retornamos el resultado de la operación
      return {
        error: false,
        code: 201,
        message: "cancion agregado a favoritos correctamente",
        data: result,
      };
    } catch (error) {
      //retornamos un error en caso de que ocurra una excepción
      return {
        error: true,
        code: 500,
        message: "Error al agregar la cancion a favoritos: " + error.message,
      };
    }
  }

  //metodo para obtener canciones favoritas de un usuario
  static async getCancionesFavoritosByUserId(userId) {
    try {
      //creamos la instancia del modelo Artista
      const OBJCancion = new Cancion();
      //llamamos al método getArtistasFavoritos del modelo
      const CancionesFavoritas = await OBJCancion.getCancionesFavoritosByUserId(
        userId
      );
      //retornamos los artistas favoritos obtenidos
      return {
        error: false,
        code: 200,
        message: "canciones favoritos obtenidos correctamente",
        data: CancionesFavoritas,
      };
    } catch (error) {
      //retornamos un error en caso de que ocurra una excepción
      return {
        error: true,
        code: 500,
        message: "Error al obtener los artistas favoritos: " + error.message,
      };
    }
  }

  //método para eliminar cancion de favoritos
  static async removeCancionFromFavorites(cancionId, userId) {
    try {
      //creamos la instancia del modelo Artista
      const OBJCancion = new Cancion();
      //llamamos al método eliminarArtistaFavorito del modelo
      const result = await OBJCancion.removeCancionFromFavorites(
        userId, 
        cancionId
      );
      //retornamos el resultado de la operación
      return {
        error: false,
        code: 200,
        message: "cancion eliminada de favoritos correctamente",
        data: result,
      };
    } catch (error) {
      //retornamos un error en caso de que ocurra una excepción
      return {
        error: true,
        code: 500,
        message: "Error al eliminar la cancion de favoritos: " + error.message,
      };
    }
  }

  //método para eliminar todos los artistas favoritos de un usuario
  static async removeAllFavorites(userId) {
    try {
      //creamos la instancia del modelo Artista
      const OBJCancion = new Cancion();
      //llamamos al método eliminarTodosArtistasFavoritos del modelo
      const result = await OBJCancion.removeAllFavorites(userId);
      //retornamos el resultado de la operación
      return {
        error: false,
        code: 200,
        message: "Todas las canciones favoritas eliminadas correctamente",
        data: result,
      };
    } catch (error) {
      //retornamos un error en caso de que ocurra una excepción
      return {
        error: true,
        code: 500,
        message:
          "Error al eliminar todas las canciones favoritas: " + error.message,
      };
    }
  }

  static async insertarVariasCanciones(canciones) {
    try {
      const cancionModel = new Cancion();
      const resultado = await cancionModel.insertarVariasCanciones(canciones);
      return {
        error: false,
        code: 201,
        message: resultado.message,
        data: resultado
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al insertar canciones: " + error.message
      };
    }
  }
}
export default CancionService;
