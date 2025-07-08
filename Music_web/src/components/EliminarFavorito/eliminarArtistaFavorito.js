export const eliminarArtistaFavorito = async (artista_id, nombre_artista, onSuccess = null) => {
  try {
    const confirmacion = confirm(`¿Estás seguro de eliminar a "${nombre_artista}" de tus favoritos?`);
    if (!confirmacion) return;

    const token = localStorage.getItem("token"); // Asumiendo que guardas el token así

    const response = await fetch("http://localhost:3000/artistas/favoritos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ artista_id }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Artista eliminado de favoritos:", result);
      if (typeof onSuccess === "function") onSuccess(); // Ejecutar función de actualización si se pasó
    } else {
      console.error("Error al eliminar favorito:", result.message || result);
      alert("No se pudo eliminar el artista de favoritos.");
    }
  } catch (error) {
    console.error("Error al eliminar artista favorito:", error);
  }
};
