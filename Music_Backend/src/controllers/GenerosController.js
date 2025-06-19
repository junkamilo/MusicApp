import GenerosService from "../services/GenerosService.js";

class GenerosController {
    // Método para obtener todos los géneros musicales
    static getAllGeneros = async (req, res) => {
        try {
            // Llamamos al servicio para obtener todos los géneros
            const response = await GenerosService.getAllGeneros();
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response.data);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener los géneros: " + error.message });
        }
    };

    // Método para obtener un género musical por su ID
    static getGeneroById = async (req, res) => {
        const { id } = req.params;
        try {
            // Llamamos al servicio para obtener un género por su ID
            const response = await GenerosService.getGeneroById(id);
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            return res.status(response.code).json(response.data);
        } catch (error) {
            return res.status(404).json({ message: "Género no encontrado: " + error.message });
        }
    };
}

export default GenerosController;