import AudioService from "../services/guardarArchivoAudio.js"; // Asegúrate de que esta clase exista

class AudioController {
  static subirAudio = async (req, res) => {
    const { id } = req.params;
    const file = req.file;
    console.log("Archivo recibido:", req.file);


    if (!file) {
      return res.status(400).json({ message: "No se recibió archivo .mp3" });
    }

    try {
      const response = await AudioService.guardarArchivoAudio(id, file);

      if (response.error) {
        return res.status(response.code).json({ message: response.message });
      }

      return res.status(response.code).json(response);
    } catch (error) {
      console.error("Error en subirAudio:", error);
      return res.status(500).json({
        message: "Error interno al guardar el archivo: " + error.message
      });
    }
  };
}

export default AudioController;

