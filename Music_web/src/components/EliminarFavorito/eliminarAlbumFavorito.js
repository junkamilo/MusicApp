// eliminarAlbumFavorito.js


/**
 * Elimina un álbum de los favoritos del usuario.
 * @param {string} albumId - El ID del álbum a eliminar.
 * @param {string} albumName - El nombre del álbum (para la alerta).
 * @param {Function} onSuccess - Callback a ejecutar si la eliminación es exitosa.
 */
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

/**
 * Elimina todos los álbumes favoritos del usuario.
 * @param {Function} onSuccess - Callback a ejecutar si la eliminación es exitosa.
 */
export const eliminarTodosAlbumesFavoritos = async (onSuccess) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.warn("No hay token de acceso. Redirigiendo a login.");
        window.location.hash = "#Login";
        return;
    }

    // Opcional: Confirmación antes de eliminar todos
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