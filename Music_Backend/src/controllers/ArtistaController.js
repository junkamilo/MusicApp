import ArtistasService from "../services/ArtistasService.js";

class ArtistaController {
    //obtenemos todos los artistas
    static getAllArtistas = async (req, res) => {
        try {
            //llamamos al servicio para obtener los artistas
            const response = await ArtistasService.getAllArtistas();
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos los artistas obtenidos
            return res.status(response.code).json(response);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener los artistas: " + error.message });
        }
    }

    //obtenemos un artista por su id
    static getArtistaById = async (req, res) => {
        const { id } = req.params; //obtenemos el id del artista desde los parámetros de la solicitud
        try {
            //llamamos al servicio para obtener el artista por su id
            const response = await ArtistasService.getArtistaById(id);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el artista obtenido
            return res.status(response.code).json(response.data);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener el artista: " + error.message });
        }
    }

    //obtenemos los albumes de un artista por su id
    static getAlbumesByArtistaId = async (req, res) => {
        const { id } = req.params; //obtenemos el id del artista desde los parámetros de la solicitud
        try {
            //llamamos al servicio para obtener los albumes del artista por su id
            const response = await ArtistasService.getAlbumesByArtistaId(id);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos los albumes obtenidos
            return res.status(response.code).json(response.data);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener los albumes del artista: " + error.message });
        }
    }

    //obtenemos las canciones de un album por su id
    static getCancionesByAlbumId = async (req, res) => {
        const { albumId } = req.params; //obtenemos el id del album desde los parámetros de la solicitud
        try {
            //llamamos al servicio para obtener las canciones del album por su id
            const response = await ArtistasService.getCancionesByAlbumId(albumId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos las canciones obtenidas
            return res.status(response.code).json(response.data);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener las canciones del album: " + error.message });
        }
    }

    //obtenemos las canciones de un artista por su id
    static getCancionesByArtistaId = async (req, res) => {
        const { id } = req.params; //obtenemos el id del artista desde los parámetros de la solicitud
        try {
            //llamamos al servicio para obtener las canciones del artista por su id
            const response = await ArtistasService.getCancionesByArtistaId(id);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos las canciones obtenidas
            return res.status(response.code).json(response.data);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener las canciones del artista: " + error.message });
        }
    }

    //obtenemos los artistas destacados por género
    static getArtistasDestacadosPorGenero = async (req, res) => {
        try {
            //llamamos al servicio para obtener los artistas destacados por género
            const response = await ArtistasService.getArtistasDestacadosPorGenero();
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos los artistas destacados obtenidos
            return res.status(response.code).json(response);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener los artistas destacados por género: " + error.message });
        }
    }

    //obtenemos los artistas por género id
    static getArtistasPorGeneroId = async (req, res) => {
        const { generoId } = req.params; //obtenemos el id del género desde los parámetros de la solicitud
        try {
            //llamamos al servicio para obtener los artistas por género id
            const response = await ArtistasService.getArtistasPorGeneroId(generoId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos los artistas obtenidos
            return res.status(response.code).json(response);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener los artistas por género id: " + error.message });
        }
    }
    //agregamos un artista favorito de un usuario
    static addArtistaAFavoritos = async (req, res) => {
        const { artistaId } = req.body; //obtenemos el id del usuario y del artista desde el cuerpo de la solicitud
        const usuarioId = req.user.id; //obtenemos el id del usuario desde los parámetros de la solicitud
        try {
            //llamamos al servicio para agregar el artista favorito del usuario
            const response = await ArtistasService.addArtistaFavorito(usuarioId, artistaId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el mensaje de éxito
            return res.status(response.code).json({ message: response.message });
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al agregar el artista favorito: " + error.message });
        }
    }
    //obtenemos los artistas favoritos de un usuario
    static getArtistasFavoritosByUserId = async (req, res) => {
        const userId  = req.user.id; //obtenemos el id del usuario desde los parámetros de la solicitud
        try {
            //llamamos al servicio para obtener los artistas favoritos del usuario por su id
            const response = await ArtistasService.getArtistasFavoritos(userId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos los artistas favoritos obtenidos
            return res.status(response.code).json(response);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener los artistas favoritos: " + error.message });
        }
    }

    //eliminamos un artista de favoritos
    static eliminarArtistaFavorito = async (req, res) => {
        const userId = req.user.id;
        const artistaId = req.params.id;
        try {
            //llamamos al servicio para eliminar el artista de favoritos del usuario
            const response = await ArtistasService.eliminarArtistaFavorito(artistaId, userId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el mensaje de éxito
            return res.status(response.code).json({ message: response.message });
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al eliminar el artista de favoritos: " + error.message });
        }
    }
    //eliminamos todos los artistas favoritos de un usuario
    static eliminarTodosArtistasFavoritos = async (req, res) => {
        const userId = req.user.id; //obtenemos el id del usuario desde los parámetros de la solicitud
        try {
            //llamamos al servicio para eliminar todos los artistas favoritos del usuario por su id
            const response = await ArtistasService.eliminarTodosArtistasFavoritos(userId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el mensaje de éxito
            return res.status(response.code).json({ message: response.message });
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al eliminar todos los artistas favoritos: " + error.message });
        }
    }

//metodo para que el usuario se convierta en artista
static convertirUsuarioAArtista = async (req, res) => {
    const userId = req.user.id; // obtenido desde el token JWT

    // Obtenemos los datos del body de la petición
    const { nombreArtista, biografia, urlFotoArtista, generos  } = req.body;

    if (!Array.isArray(generos) || generos.length === 0) {
        
    return res.status(400).json({ message: "Debe proporcionar al menos un género musical." });
  }

    try {
        // Llamamos al servicio pasando todos los datos
        const response = await ArtistasService.convertirUsuarioEnArtista(nombreArtista, biografia, urlFotoArtista, userId, generos);

        // Verificamos si hubo error
        if (response.error) {
            return res.status(response.code).json({ message: response.message });
        }

        // Retornamos la respuesta de éxito
        return res.status(response.code).json({
            message: response.message,
            data: response.data // puedes retornar el artistaId u otros datos útiles
        });

    } catch (error) {
        return res.status(500).json({ message: "Error al convertir el usuario en artista: " + error.message });
    }
}

  static subirFotoArtista = async (req, res) => {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No se recibió archivo de imagen" });
    }

    const response = await ArtistasService.guardarFotoArtista(id, file);

    if (response.error) {
      return res.status(response.code).json({ message: response.message });
    }

    return res.status(response.code).json(response);
  };

}

export default ArtistaController;