import Artista from "../models/Artista.js";

class ArtistasService {
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
}

export default ArtistasService;