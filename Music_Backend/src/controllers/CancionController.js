import CancionService from "../services/CancionService.js";

class CancionController {
    // Método para obtener todas las canciones
    static getAllCanciones = async (req, res) => {
        try {
            // Llamamos al servicio para obtener todas las canciones
            // y manejamos la respuesta
            const response = await CancionService.getAllCanciones();
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener las canciones: " + error.message });
        }
    }

    // Método para obtener una canción por su ID
    static getCancionById = async (req, res) => {
        const { id } = req.params;
        try {
            // Llamamos al servicio para obtener una canción por su ID
            // y manejamos la respuesta
            const response = await CancionService.getCancionById(id);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response.data);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener la canción: " + error.message });
        }
    }

    // Método para obtener canciones de un álbum por su ID
    static getCancionesByAlbumId = async (req, res) => {
        const { albumId } = req.params;
        try {
            // Llamamos al servicio para obtener las canciones de un álbum por su ID
            // y manejamos la respuesta
            const response = await CancionService.getCancionesByAlbumId(albumId);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response.data);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener las canciones del álbum: " + error.message });
        }
    }

    // Método para obtener canciones de un artista por su ID
    static getCancionesByArtistaId = async (req, res) => {
        const { id } = req.params;
        try {
            // Llamamos al servicio para obtener las canciones de un artista por su ID
            // y manejamos la respuesta
            const response = await CancionService.getCancionesByArtistaId(id);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response.data);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener las canciones del artista: " + error.message });
        }
    }

    // Metodo para obtener canciones mas populares
    static getCancionesMasPopulares = async (req, res) => {
        try {
            // Llamamos al servicio para obtener las canciones más populares
            // y manejamos la respuesta
            const response = await CancionService.getCancionesMasPopulares();
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener las canciones más populares: " + error.message });
        }
    }

    //metodo para obtner cancioes de cada album por su genero
    static getCancionesAlbumGenero = async (req, res) => {
        const { generoId } = req.params;
        try {
            // Llamamos al servicio para obtener las canciones por género
            const response = await CancionService.getCancionesAlbumGenero(generoId);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener las canciones por género: " + error.message });
        }
    }

    //agregamos un artista favorito de un usuario
    static addCancionToFavorites = async (req, res) => {
        const { cancionId } = req.body; //obtenemos el id del usuario y del artista desde el cuerpo de la solicitud
        const usuarioId = req.user.id; //obtenemos el id del usuario desde los parámetros de la solicitud
        try {
            //llamamos al servicio para agregar el artista favorito del usuario
            const response = await CancionService.addCancionToFavorites(usuarioId, cancionId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el mensaje de éxito
            return res.status(response.code).json({ message: response.message });
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al agregar la cancion favorita: " + error.message });
        }
    }

    //obtenemos los artistas favoritos de un usuario
    static getCancionesFavoritosByUserId = async (req, res) => {
        const userId  = req.user.id; //obtenemos el id del usuario desde los parámetros de la solicitud
        try {
            const response = await CancionService.getCancionesFavoritosByUserId(userId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos los artistas favoritos obtenidos
            return res.status(response.code).json(response);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener las canciones favoritas: " + error.message });
        }
    }

    //eliminamos una cancion de favoritos
    static removeCancionFromFavorites = async (req, res) => {
        const userId = req.user.id;
        const cancionId = req.params.id;
        try {
            //llamamos al servicio para eliminar la cancion de favoritos del usuario
            const response = await CancionService.removeCancionFromFavorites(cancionId, userId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el mensaje de éxito
            return res.status(response.code).json({ message: response.message });
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al eliminar la cancion de favoritos: " + error.message });
        }
    }
    //eliminamos todos los artistas favoritos de un usuario
    static removeAllFavorites = async (req, res) => {
        const userId = req.user.id; //obtenemos el id del usuario desde los parámetros de la solicitud
        try {
            const response = await CancionService.removeAllFavorites(userId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el mensaje de éxito
            return res.status(response.code).json({ message: response.message });
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al eliminar todas las canciones favoritas: " + error.message });
        }
    }

      // Controlador para insertar canciones
  static insertarVariasCanciones = async (req, res) => {
    try {
      const { canciones } = req.body;

      if (!Array.isArray(canciones) || canciones.length === 0) {
        return res.status(400).json({ message: "Se requiere un arreglo de canciones." });
      }

      const response = await CancionService.insertarVariasCanciones(canciones);
      if (response.error) {
        return res.status(response.code).json({ message: response.message });
      }

      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Error al insertar canciones: " + error.message });
    }
  };
}

export default CancionController;