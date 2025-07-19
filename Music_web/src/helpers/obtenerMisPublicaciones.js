import {
  EliminadoCancionFavorita,
  EliminadoAlbumFavorito,
  error,
} from "./alerts.js";

// Puedes dejar esto así si no usas `config.js`
const API_URL = "http://localhost:3000";

// Obtener todas las publicaciones del artista autenticado
export const obtenerMisPublicaciones = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.warn("Token no encontrado. Redirigiendo a login.");
    window.location.hash = "#Login";
    return;
  }

  try {
    
    const res = await fetch(`${API_URL}/mis-publicaciones`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    

    const data = await res.json();
    

    if (!res.ok) {
      console.error("Error al obtener publicaciones:", data.message);
      error({ message: data.message || "Error al obtener publicaciones" });
      return [];
    }

    return data.data || [];
  } catch (err) {
    console.error("Error al cargar publicaciones:", err);
    error({ message: "Error de red al cargar publicaciones" });
    return [];
  }
};

// Eliminar una canción del artista
export const eliminarCancionAPI = async (cancionId, cancionNombre, onSuccess) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    window.location.hash = "#Login";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/mis-publicaciones/cancion/${cancionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error al eliminar canción:", data.message);
      error({ message: data.message || "Error al eliminar la canción" });
      return;
    }

    if (typeof onSuccess === "function") onSuccess();
    EliminadoCancionFavorita(cancionNombre);
  } catch (err) {
    console.error("Error al enviar solicitud de eliminación de canción:", err);
    error({ message: "Error de conexión al intentar eliminar la canción" });
  }
};

// Eliminar un álbum del artista
export const eliminarAlbumAPI = async (albumId, albumNombre, onSuccess) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    window.location.hash = "#Login";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/mis-publicaciones/album/${albumId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("Respuesta del backend al eliminar álbum:", data);

if (!res.ok || data.error) {
  const msg = data.message;

  if (msg?.includes("foreign key constraint fails")) {
    error({
      message: "No se puede eliminar este álbum porque aún está marcado como favorito por algunos usuarios. Por favor, elimine primero esos registros de favoritos.",
    });
  } else if (msg === "El álbum tiene canciones y no puede eliminarse.") {
    error({ message: msg });
  } else {
    error({ message: msg || "Error al eliminar el álbum" });
  }

  return;
}

    if (typeof onSuccess === "function") onSuccess();
    EliminadoAlbumFavorito(albumNombre);
  } catch (err) {
    console.error("Error al enviar solicitud de eliminación de álbum:", err);
    error({ message: "Error de conexión al intentar eliminar el álbum" });
  }
};

// Modificar un álbum del artista
export const modificarAlbumAPI = async (albumId, datosAlbum, onSuccess) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    window.location.hash = "#Login";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/mis-publicaciones/album/${albumId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosAlbum),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error al modificar álbum:", data.message);
      error({ message: data.message || "Error al modificar el álbum" });
      return;
    }

    if (typeof onSuccess === "function") onSuccess();
    // Puedes mostrar una alerta de éxito si tienes una como `ModificadoAlbum()`
  } catch (err) {
    console.error("Error al modificar álbum:", err);
    error({ message: "Error de conexión al intentar modificar el álbum" });
  }
};

// Subir una nueva canción
export const subirCancionAPI = async (formData, onSuccess) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    window.location.hash = "#Login";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/mis-publicaciones/cancion`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // importante: no usar JSON.stringify aquí, es FormData
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error al subir canción:", data.message);
      error({ message: data.message || "Error al subir la canción" });
      return;
    }

    if (typeof onSuccess === "function") onSuccess();
    // Puedes agregar alerta `CancionSubidaConExito()` si quieres
  } catch (err) {
    console.error("Error al subir canción:", err);
    error({ message: "Error de conexión al subir la canción" });
  }
};

