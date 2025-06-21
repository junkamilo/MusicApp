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
}

export default CancionController;