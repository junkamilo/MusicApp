// ✅ Eliminar un solo género favorito
export const eliminarGeneroFavorito = async (generoId, callback) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`http://localhost:3000/generosMusicales/favoritos/${generoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al eliminar el género favorito");
    }

    if (callback) callback(); // ✅ actualizar la vista
  } catch (error) {
    console.error("Error eliminando género favorito:", error.message);
  }
};

// ✅ Eliminar todos los géneros favoritos
export const eliminarTodosGenerosFavoritos = async (callback) => {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`http://localhost:3000/generosMusicales/favoritos`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al eliminar todos los géneros favoritos");
    }

    if (callback) callback(); // ✅ actualizar la vista
  } catch (error) {
    console.error("Error eliminando todos los géneros favoritos:", error.message);
  }
};
