import playlistServices from "../services/PlaylistServices.js";



class PlaylistController {
  // Crear una nueva playlist
  static crearPlaylist = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const id_usuario = req.user.id;

    try {
      const response = await playlistServices.crearPlaylist(id_usuario, nombre, descripcion);
      if (response.error) {
        return res.status(response.code).json({ message: response.message });
      }
      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Error al crear la playlist: " + error.message,
      });
    }
  };

  // Agregar una canción a una playlist
  static agregarCancion = async (req, res) => {
    const { playlist_id } = req.params;
    const { cancion_id, posicion_cancion } = req.body;

    try {
      const response = await playlistServices.agregarCancion(playlist_id, cancion_id, posicion_cancion);
      if (response.error) {
        return res.status(response.code).json({ message: response.message });
      }
      return res.status(response.code).json({ message: response.message });
    } catch (error) {
      return res.status(500).json({
        message: "Error al agregar la canción: " + error.message,
      });
    }
  };

  // Obtener una playlist con sus canciones
  static obtenerPlaylist = async (req, res) => {
    const { playlist_id } = req.params;

    try {
      const response = await playlistServices.obtenerPlaylistConCanciones(playlist_id);
      if (response.error) {
        return res.status(response.code).json({ message: response.message });
      }
      return res.status(response.code).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener la playlist: " + error.message,
      });
    }
  };
}

export default PlaylistController;
