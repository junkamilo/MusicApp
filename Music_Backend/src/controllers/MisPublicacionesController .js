import MisPublicacionesService from "../services/misPublicacionesServices.js";

class MisPublicacionesController {
  // 1. Obtener todas las publicaciones del artista
  static async listar(req, res) {
    try {
      const artista_id = req.user.artista_id;
      const response = await MisPublicacionesService.listarPublicaciones(
        artista_id
      );

      if (response.error) {
        return res.status(response.code).json({ message: response.message });
      }

      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Error al listar publicaciones: " + error.message,
      });
    }
  }

  // 2. Eliminar una canción del artista
  static async eliminarCancion(req, res) {
    const { id } = req.params;
    const artista_id = req.user.artista_id;

    try {
      const response = await MisPublicacionesService.eliminarCancion(
        id,
        artista_id
      );

      if (response.error) {
        return res.status(response.code).json({ message: response.message });
      }

      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Error al eliminar canción: " + error.message,
      });
    }
  }

  // 3. Eliminar un álbum (solo si no tiene canciones)
  static async eliminarAlbum(req, res) {
    const { id } = req.params;
    const artista_id = req.user.artista_id;

    try {
      const response = await MisPublicacionesService.eliminarAlbum(
        id,
        artista_id
      );

      if (response.error) {
        return res.status(response.code).json({
          error: true,
          message: response.message,
        });
      }

      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Error al eliminar álbum: " + error.message,
      });
    }
  }

  // 4. Modificar los datos de un álbum
  static async modificarAlbum(req, res) {
    const { id } = req.params;
    const artista_id = req.user.artista_id;
    const datos = req.body;

    try {
      const response = await MisPublicacionesService.modificarAlbum(
        id,
        artista_id,
        datos
      );

      if (response.error) {
        return res.status(response.code).json({ message: response.message });
      }

      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Error al modificar álbum: " + error.message,
      });
    }
  }

  // 5. Subir una nueva canción a un álbum del artista
  static async subirCancion(req, res) {
    const artista_id = req.user.artista_id;
    const datos = req.body;

    try {
      const response = await MisPublicacionesService.subirCancion(
        datos,
        artista_id
      );

      if (response.error) {
        return res.status(response.code).json({ message: response.message });
      }

      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Error al subir canción: " + error.message,
      });
    }
  }
}

export default MisPublicacionesController;
