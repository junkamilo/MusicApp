import MisPublicacionesModel from "../models/misPublicaciones.js";


class MisPublicacionesService {
  // 📌 1. Listar álbumes y canciones del artista
  static async listarPublicaciones(artista_id) {
    try {
      const data = await MisPublicacionesModel.obtenerAlbumesConCancionesPorArtista(artista_id);

      if (!data || data.length === 0) {
        return {
          error: false,
          code: 200,
          message: "El artista no tiene álbumes publicados",
          data: []
        };
      }

      // Agrupar por álbum
      const albumes = {};
      for (const fila of data) {
        if (!albumes[fila.album_id]) {
          albumes[fila.album_id] = {
            album_id: fila.album_id,
            titulo_album: fila.titulo_album,
            descripcion_album: fila.descripcion_album,
            fecha_album: fila.fecha_album,
            url_portada_album: fila.url_portada_album,
            canciones: [],
          };
        }

        if (fila.cancion_id) {
          albumes[fila.album_id].canciones.push({
            cancion_id: fila.cancion_id,
            titulo_cancion: fila.titulo_cancion,
            numero_pista: fila.numero_pista,
            url_archivo_audio: fila.url_archivo_audio,
            duracion: fila.duracion,
            descripcion_cancion: fila.descripcion_cancion,
          });
        }
      }

      return {
        error: false,
        code: 200,
        message: "Publicaciones obtenidas correctamente",
        data: Object.values(albumes)
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al listar publicaciones: " + error.message
      };
    }
  }

  // 📌 2. Eliminar una canción
  static async eliminarCancion(cancion_id, artista_id) {
    try {
      const result = await MisPublicacionesModel.eliminarCancion(cancion_id, artista_id);
      return {
        error: false,
        code: 200,
        message: "Canción eliminada correctamente",
        data: result
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al eliminar canción: " + error.message
      };
    }
  }

  // 📌 3. Eliminar álbum si no tiene canciones
  static async eliminarAlbum(album_id, artista_id) {
    try {
      const result = await MisPublicacionesModel.eliminarAlbumSiEstaVacio(album_id, artista_id);

if (result.error) {
  return {
    error: true,
    code: 400, // o el código que prefieras para errores de negocio
    message: result.message
  };
}

return {
  error: false,
  code: 200,
  message: "Álbum eliminado correctamente"
};

    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al eliminar álbum: " + error.message
      };
    }
  }

  // 📌 4. Modificar datos del álbum
  static async modificarAlbum(album_id, artista_id, datos) {
    try {
      const result = await MisPublicacionesModel.modificarAlbum(album_id, artista_id, datos);
      return {
        error: false,
        code: 200,
        message: "Álbum modificado correctamente",
        data: result
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al modificar álbum: " + error.message
      };
    }
  }

  // 📌 5. Subir nueva canción a un álbum del artista
  static async subirCancion(datos, artista_id) {
    try {
      const result = await MisPublicacionesModel.subirCancion(datos, artista_id);
      return {
        error: false,
        code: 201,
        message: "Canción subida correctamente",
        data: result
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al subir canción: " + error.message
      };
    }
  }
}

export default MisPublicacionesService;
