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
            return res.status(response.code).json(response.data);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener los artistas: " + error.message });
        }
    }
}

export default ArtistaController;