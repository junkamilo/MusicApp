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

static subirMultiplesAudios = async (req, res) => {
  const files = req.files;
  let ids = req.body.ids;

  // Forzar a que sea array siempre, incluso si llega como string separado por comas
  if (typeof ids === "string") {
    ids = ids.includes(",") ? ids.split(",") : [ids];
  } else if (!Array.isArray(ids)) {
    ids = [ids];
  }

  if (!files || !ids || files.length !== ids.length) {
    return res.status(400).json({
      message: "La cantidad de archivos y de IDs no coincide",
      files: files?.length,
      ids: ids?.length,
      recibido: { ids, files },
    });
  }

  const resultados = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const id = ids[i];

    try {
      const response = await AudioService.guardarArchivoAudio(id, file);
      resultados.push(response);
    } catch (error) {
      resultados.push({
        error: true,
        cancionId: id,
        message: "Error con el archivo: " + error.message,
      });
    }
  }

  return res.status(200).json({
    message: "Proceso completado",
    resultados,
  });
};


}

export default AudioController;

