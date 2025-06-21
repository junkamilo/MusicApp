import GenerosService from "../services/GenerosService.js";

class GenerosController {
    //obtenemos todos los géneros
    static getAllGeneros = async (req, res) => {
        try {
            //llamamos al servicio para obtener los géneros
            const response = await GenerosService.getAllGeneros();
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos los géneros obtenidos
            return res.status(response.code).json(response);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener los géneros: " + error.message });
        }
    }
    //obtenemos un género por su id
    static getGeneroById = async (req, res) => {
        const { id } = req.params; //obtenemos el id del género desde los parámetros de la solicitud
        try {
            //llamamos al servicio para obtener el género por su id
            const response = await GenerosService.getGeneroById(id);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el género obtenido
            return res.status(response.code).json(response.data);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener el género: " + error.message });
        }
    }
}

export default GenerosController;
