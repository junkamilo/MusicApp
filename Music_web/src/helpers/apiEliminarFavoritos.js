import { EliminadoAlbumFavorito, EliminadoCancionFavorita, EliminadoTodosAlbumesFavoritos, EliminadoTodosCancionesFavoritas, error } from "./alerts";

//funciones para eliminar álbumes favoritos y todos los álbumes favoritos
export const eliminarAlbumFavorito = async (albumId, albumName, onSuccess) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.warn("No hay token de acceso. Redirigiendo a login.");
        window.location.hash = "#Login";
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/albumes/favoritos/${albumId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const result = await response.json();
            console.error("Error al eliminar álbum favorito:", result.message);
            error({ message: result.message || "Error al eliminar el álbum de favoritos." });
            return;
        }

        // Si la eliminación fue exitosa, ejecuta el callback de éxito
        if (typeof onSuccess === "function") {
            onSuccess();
        }
        EliminadoAlbumFavorito(albumName); // Muestra la alerta de éxito

    } catch (err) {
        console.error("Error al enviar solicitud de eliminación de álbum favorito:", err);
        error({ message: "Error de conexión al intentar eliminar el álbum favorito." });
    }
};

export const eliminarTodosAlbumesFavoritos = async (onSuccess) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.warn("No hay token de acceso. Redirigiendo a login.");
        window.location.hash = "#Login";
        return;
    }
    if (!confirm("¿Estás seguro de que quieres eliminar TODOS tus álbumes favoritos?")) {
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/albumes/favoritos/todos", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const result = await response.json();
            console.error("Error al eliminar todos los álbumes favoritos:", result.message);
            error({ message: result.message || "Error al eliminar todos los álbumes favoritos." });
            return;
        }

        // Si la eliminación fue exitosa, ejecuta el callback de éxito
        if (typeof onSuccess === "function") {
            onSuccess();
        }
        EliminadoTodosAlbumesFavoritos(); // Muestra la alerta de éxito

    } catch (err) {
        console.error("Error al enviar solicitud de eliminación de todos los álbumes favoritos:", err);
        error({ message: "Error de conexión al intentar eliminar todos los álbumes favoritos." });
    }
};
//funciones para eliminar canciones favoritas y todas las canciones favoritas
export const eliminarCancionFavorita = async (cancionId, cancionName, onSuccess) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.warn("No hay token de acceso. Redirigiendo a login.");
        window.location.hash = "#Login";
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/canciones/favoritos/${cancionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const result = await response.json();
            console.error("Error al eliminar canción favorita:", result.message);
            error({ message: result.message || "Error al eliminar la canción de favoritos." });
            return;
        }

        // Si la eliminación fue exitosa, ejecuta el callback de éxito
        if (typeof onSuccess === "function") {
            onSuccess();
        }
        EliminadoCancionFavorita(cancionName); // Muestra la alerta de éxito

    } catch (err) {
        console.error("Error al enviar solicitud de eliminación de canción favorita:", err);
        error({ message: "Error de conexión al intentar eliminar la canción favorita." });
    }
};
export const eliminarTodasCancionesFavoritas = async (onSuccess) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.warn("No hay token de acceso. Redirigiendo a login.");
        window.location.hash = "#Login";
        return;
    }
    if (!confirm("¿Estás seguro de que quieres eliminar TODAS tus canciones favoritas?")) {
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/canciones/favoritos/todos", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const result = await response.json();
            console.error("Error al eliminar todas las canciones favoritas:", result.message);
            error({ message: result.message || "Error al eliminar todas las canciones favoritas." });
            return;
        }

        // Si la eliminación fue exitosa, ejecuta el callback de éxito
        if (typeof onSuccess === "function") {
            onSuccess();
        }
        EliminadoTodosCancionesFavoritas(); // Muestra la alerta de éxito

    } catch (err) {
        console.error("Error al enviar solicitud de eliminación de todas las canciones favoritas:", err);
        error({ message: "Error de conexión al intentar eliminar todas las canciones favoritas." });
    }
};
