// helpers/apiFavoritos.js
export const agregarAlbumAFavoritos = async (albumId) => {
  try {
    const token = localStorage.getItem("accessToken"); // Usa el mismo que con géneros
    if (!token) throw new Error("No autenticado");

    const response = await fetch("http://localhost:3000/albumes/favoritos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ albumId }) // ✅ solo se necesita el albumId
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);
    return { ok: true, message: data.message };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};
export const agregarCancionFavorita = async (cancionId ) => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No autenticado");
  if (!token) return;

  try {
    const response = await fetch("http://localhost:3000/canciones/favoritos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cancionId  }), 
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    throw error;
  }
};
