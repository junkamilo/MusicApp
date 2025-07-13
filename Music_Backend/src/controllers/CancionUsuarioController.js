import CancionUsuarioService from "../services/CancionUsuarioService.js";


class CancionUsuarioController {
  static async subirCancionUsuario(req, res) {
    const { id_usuario } = req.params;
    const file = req.file;
    const body = req.body;

    if (!file) {
      return res.status(400).json({ message: "No se recibió archivo .mp3" });
    }

    try {
      const nueva = await CancionUsuarioService.guardarCancionUsuario(id_usuario, file, body);
      return res.status(201).json({
        message: "Canción del usuario subida correctamente",
        data: nueva
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al subir la canción",
        error: error.message
      });
    }
  }

    static async obtenerCancionesUsuario(req, res) {
    const { id_usuario } = req.params;

    try {
      const canciones = await CancionUsuarioService.obtenerCancionesDeUsuario(id_usuario);
      return res.status(200).json({
        message: "Canciones del usuario obtenidas correctamente",
        data: canciones
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener las canciones",
        error: error.message
      });
    }
  }

static async eliminarCancionUsuario(req, res) {
  const { id_cancion_usuario } = req.params;
  const id_usuario = req.user?.id;

  try {
    const result = await CancionUsuarioService.eliminarCancionUsuario(id_cancion_usuario, id_usuario);
    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(403).json({
      message: "No autorizado o error al eliminar la canción",
      error: error.message
    });
  }
}
}

export default CancionUsuarioController;
