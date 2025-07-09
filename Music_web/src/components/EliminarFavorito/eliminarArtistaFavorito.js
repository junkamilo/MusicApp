import { confirmarEliminacion, EliminadoArtistasFavoritos, error, success } from "../../helpers/alerts";
import { getData } from "../../helpers/auth";


export const eliminarArtistaFavorito = async (artista_id, nombre_artista, onSuccess = null) => {
  try {
    const confirmacion = await confirmarEliminacion(nombre_artista);
    if (!confirmacion.isConfirmed) return;

    const { accessToken: token } = getData();

    const response = await fetch(`http://localhost:3000/artistas/favoritos/${artista_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ artista_id }),
    });

    const result = await response.json();

    if (response.ok) {
      EliminadoArtistasFavoritos(nombre_artista);
      if (typeof onSuccess === "function") onSuccess(); // Ejecutar función de actualización si se pasó
    } else {
      console.error("Error al eliminar favorito:", result.message || result);
      alert("No se pudo eliminar el artista de favoritos.");
    }
  } catch (error) {
    error({ message: "Error inesperado al eliminar artista de favoritos." });
    console.error("Error:", err);
  }
};

export const eliminarTodosArtistasFavoritos = async (onSuccess = null) => {
  try {
    const confirmacion = await confirmarEliminacion("todos los artistas");
    if (!confirmacion.isConfirmed) return;

    const { accessToken: token } = getData();

    const response = await fetch("http://localhost:3000/artistas/favoritos/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      success({ mensaje: "Todos los artistas favoritos fueron eliminados" });
      if (typeof onSuccess === "function") onSuccess();
    } else {
      error({ message: result.message || "No se pudieron eliminar los artistas." });
    }
  } catch (err) {
    console.error("Error al eliminar todos los artistas favoritos:", err);
    error({ message: "Ocurrió un error al intentar eliminar todos los artistas." });
  }
};

