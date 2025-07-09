import { cardsArtistaFavorito } from "../../components/cardsArtista/cardArtistaFavorito";
import { contentCards } from "../../components/ContentCards/contentCards";
import { eliminarTodosArtistasFavoritos } from "../../components/EliminarFavorito/eliminarArtistaFavorito";
import { headerFavoritos } from "../../components/headerFavoritos/headerFavoritos";
import { error } from "../../helpers/alerts";

export const artistasFavoritosController = async () => {
  const token = localStorage.getItem("accessToken");
  const app = document.getElementById("app");

  if (!token) {
    window.location.hash = "#Login";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/artistas/favoritos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("Artistas favoritos:", data);

    if (!response.ok) {
      error({ message: data.message || "Error al obtener artistas favoritos" });
      return;
    }

    // ✅ Limpia el contenido previo del app
    app.innerHTML = "";

    // HEADER dinámico
    const header = headerFavoritos({
      tipo: "Artistas",
      titulo: "Tus artistas favoritos",
      usuario: "Juan Camilo",
      cantidad: data.data.length,
      tipoItem: "artistas",
      avatarUrl: "./assets/perfil_default.png",
    });

    app.appendChild(header);

    // Botón para eliminar todos los favoritos
    if (data.data.length > 0) {
  const btnEliminarTodos = document.createElement("button");
  btnEliminarTodos.textContent = "Eliminar todos los artistas favoritos";
  btnEliminarTodos.classList.add("btn_eliminar_todos_artistas");

  btnEliminarTodos.addEventListener("click", async () => {
    await eliminarTodosArtistasFavoritos(() => {
      // Recargar la página o actualizar el contenido después de eliminar
      artistasFavoritosController();
    });
  });

  app.appendChild(btnEliminarTodos);
}

    // CONTENEDOR DE CARDS
    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedor_artistas_favoritos");

    // ✅ Uso correcto de contentCards
    contentCards(data.data, contenedor, cardsArtistaFavorito, data.data.length);

    app.appendChild(contenedor);
  } catch (err) {
    console.error("Error al cargar artistas favoritos:", err);
    error({ message: "No se pudieron cargar tus artistas favoritos." });
  }
};
