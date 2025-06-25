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
}

export default ArtistaController;