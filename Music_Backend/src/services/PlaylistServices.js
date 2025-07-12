import { Playlist } from "../models/playlist.js";

class playlistServices {
 // Crear una nueva playlist para un usuario
  static async crearPlaylist(id_usuario, nombre, descripcion = null) {
    try {
      const playlistId = await Playlist.createPlaylist(id_usuario, nombre, descripcion);
      return {
        error: false,
        code: 201,
        message: "Playlist creada correctamente",
        data: { playlistId },
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al crear la playlist",
      };
    }
  }

    // Agregar una canción a una playlist
  static async agregarCancion(playlist_id, cancion_id, posicion_cancion) {
    try {
      await Playlist.addSongToPlaylist(playlist_id, cancion_id, posicion_cancion);
      return {
        error: false,
        code: 201,
        message: "Canción agregada a la playlist correctamente",
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al agregar la canción a la playlist",
      };
    }
  }

    // Obtener una playlist con todas sus canciones (ordenadas por posición)
  static async obtenerPlaylistConCanciones(playlist_id) {
    try {
      const playlist = await Playlist.getPlaylistWithSongs(playlist_id);
      if (!playlist || playlist.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Playlist no encontrada o vacía",
        };
      }
      return {
        error: false,
        code: 200,
        data: playlist,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener la playlist",
      };
    }
  }
}

export default playlistServices;