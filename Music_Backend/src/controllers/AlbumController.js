import AlbumService from '../services/AlbumService.js';

class AlbumController {
    // Método para obtener todos los álbumes
    static getAllAlbumes = async (req, res) => {
        try {
            // Llamamos al servicio para obtener todos los álbumes
            // y manejamos la respuesta
            const response = await AlbumService.getAllAlbumes();
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener los álbumes: " + error.message });
        }
    }

    // Método para obtener un álbum por su ID
    static getAlbumById = async (req, res) => {
        const { id } = req.params;
        try {
            // Llamamos al servicio para obtener un álbum por su ID
            // y manejamos la respuesta
            const response = await AlbumService.getAlbumById(id);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener el álbum: " + error.message });
        }
    }

    // Método para obtener álbumes de un artista por su ID
    static getAlbumesByArtistaId = async (req, res) => {
        const { id } = req.params;
        try {
            // Llamamos al servicio para obtener los álbumes de un artista por su ID
            // y manejamos la respuesta
            const response = await AlbumService.getAlbumesByArtistaId(id);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener los álbumes del artista: " + error.message });
        }
    }

    // Método para obtener álbumes más populares de cada género
    static getAlbumesPorGeneroId = async (req, res) => {
        const { generoId } = req.params;
        try {
            // Llamamos al servicio para obtener los álbumes por género
            // y manejamos la respuesta
            const response = await AlbumService.getAlbumesMasPopularesPorGenero(generoId);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener los álbumes por género: " + error.message });
        }
    }

    // Método para obtener canciones de un álbum por su ID
    static getCancionesByAlbumId = async (req, res) => {
        const { albumId } = req.params;
        try {
            // Llamamos al servicio para obtener las canciones de un álbum por su ID
            // y manejamos la respuesta
            const response = await AlbumService.getCancionesByAlbumId(albumId);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener las canciones del álbum: " + error.message });
        }
    }
    //metodo para odtener los albumes mas populares
    static getAlbumesMasPopulares = async (req, res) => {
        try {
            // Llamamos al servicio para obtener los álbumes más populares
            // y manejamos la respuesta
            const response = await AlbumService.getAlbumesMasPopulares();
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener los álbumes más populares: " + error.message });
        }
    }

    // Método para obtener los álbumes favoritos de un usuario
    static getAlbumesFavoritosByUserId = async (req, res) => {
        const userId = req.user.id;;
        try {
            // Llamamos al servicio para obtener los álbumes favoritos de un usuario
            // y manejamos la respuesta
            const response = await AlbumService.getAlbumesFavoritosByUserId(userId);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener los álbumes favoritos del usuario: " + error.message });
        }
    }

    // Método para agregar un álbum a favoritos
    static addAlbumToFavorites = async (req, res) => {
        const userId = req.user.id;
        const { albumId } = req.body;
        try {
            // Llamamos al servicio para agregar un álbum a favoritos
            // y manejamos la respuesta
            const response = await AlbumService.addAlbumToFavorites(userId, albumId);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al agregar el álbum a favoritos: " + error.message });
        }
    }

    // Método para eliminar un álbum de favoritos
    static removeAlbumFromFavorites = async (req, res) => {
        const userId = req.user.id;
        const albumId = req.params.id;
        try {
            // Llamamos al servicio para eliminar un álbum de favoritos
            // y manejamos la respuesta
            const response = await AlbumService.removeAlbumFromFavorites(userId, albumId);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Error al eliminar el álbum de favoritos: " + error.message });
        }
    }

    // Método para eliminar todos los álbumes favoritos de un usuario
    static removeAllFavorites = async (req, res) => {
        const userId = req.user.id;
        try {
            // Llamamos al servicio para eliminar todos los álbumes favoritos de un usuario
            // y manejamos la respuesta
            const response = await AlbumService.removeAllFavorites(userId);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json({ message: response.message });
        } catch (error) {
            return res.status(500).json({ message: "Error al eliminar todos los álbumes favoritos del usuario: " + error.message });
        }
    }

    // Método para crear un nuevo álbum
static crearAlbum = async (req, res) => {
    console.log("🧠 Usuario autenticado:", req.user);
    const { titulo, descripcion, fecha_lanzamiento, url_portada } = req.body;
    const artista_id = req.user.artista_id;

    try {
        const response = await AlbumService.crearAlbum({
            titulo,
            fecha_lanzamiento,
            descripcion,
            url_portada,
            artista_id
        });

        if (response.error) {
            return res.status(response.code).json({ message: response.message });
        }

        return res.status(response.code).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el álbum: " + error.message
        });
    }
};

  static subirPortadaAlbum = async (req, res) => {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No se recibió archivo de imagen" });
    }

    const response = await AlbumService.guardarPortadaAlbum(id, file);

    return res.status(response.code).json(response);
  };


}

export default AlbumController;