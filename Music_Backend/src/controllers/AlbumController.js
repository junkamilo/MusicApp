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
}

export default AlbumController;