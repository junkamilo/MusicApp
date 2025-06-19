import GenerosService from "../services/GenerosService.js";

class GenerosController {
  // Obtener todos los géneros musicales
  static getAllGeneros = async (req, res) => {
    try {
      const response = await GenerosService.getAllGeneros();

      if (response.error) {
        return res.status(response.code).json({
          success: false,
          message: response.message
        });
      }

      return res.status(response.code).json({
        success: true,
        data: response.data
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener los géneros: " + error.message
      });
    }
  };

  // Obtener género por ID
  static getGeneroById = async (req, res) => {
    const { id } = req.params;

    try {
      const response = await GenerosService.getGeneroById(id);

      if (response.error) {
        return res.status(response.code).json({
          success: false,
          message: response.message
        });
      }

      return res.status(response.code).json({
        success: true,
        data: response.data
      });

    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "Género no encontrado: " + error.message
      });
    }
  };
}

export default GenerosController;
