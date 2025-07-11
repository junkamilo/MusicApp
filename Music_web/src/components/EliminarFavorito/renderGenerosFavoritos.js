
import { headerFavoritos } from "../headerFavoritos/headerFavoritos";
import {
  eliminarGeneroFavorito,
  eliminarTodosGenerosFavoritos,
} from "./eliminarGeneroFavorito";
import { contentCards } from "../ContentCards/contentCards";
import { cardGenero } from "../cardGenero/cardGenero";
import { confirmarEliminacionGenero, confirmarEliminarTodosGeneros, EliminadoGeneroFavorito, EliminadosTodosGeneros, error } from "../../helpers/alerts";

export const renderGenerosFavoritos = async (app) => {
  app.innerHTML = ""; // ✅ Limpia el contenedor antes de renderizar

  const token = localStorage.getItem("accessToken");
  if (!token) {
    window.location.hash = "#Login";
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/generosMusicales/favoritos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = await response.json();

    if (!response.ok) {
      error({ message: "Error al obtener géneros favoritos" });
      return;
    }

    // 1️⃣ Header de favoritos
    const header = headerFavoritos({
      tipo: "Géneros",
      titulo: "Tus géneros favoritos",
      usuario: "Juan Camilo",
      cantidad: data.length,
      tipoItem: "géneros",
      avatarUrl: "./assets/perfil_default.png",
    });
    app.appendChild(header);

    // 2️⃣ Botón para eliminar todos
    if (data.length > 0) {
      const btnEliminarTodos = document.createElement("button");
      btnEliminarTodos.textContent = "Eliminar todos los géneros favoritos";
      btnEliminarTodos.classList.add("btn_eliminar_todos_generos");

      btnEliminarTodos.addEventListener("click", async () => {
        const confirmacion = await confirmarEliminarTodosGeneros();
        if (confirmacion.isConfirmed) {
          await eliminarTodosGenerosFavoritos(() => {
            EliminadosTodosGeneros();
            renderGenerosFavoritos(app);
          });
        }
      });

      app.appendChild(btnEliminarTodos);
    }

    // 3️⃣ Contenedor para las cards
    const contenedorCards = document.createElement("div");
    contenedorCards.classList.add("contenedor_cards_generos");
    app.appendChild(contenedorCards);

    // 4️⃣ Renderizado con contentCards y callback personalizado
    contentCards(
      data,
      contenedorCards,
      (items, contenedor) => {
        cardGenero(
          items,
          contenedor,
          true, // isFavoritePage
          async (id, nombre) => {
            const confirmacion = await confirmarEliminacionGenero(nombre);
            if (confirmacion.isConfirmed) {
              await eliminarGeneroFavorito(id, () => {
                EliminadoGeneroFavorito(nombre);
                renderGenerosFavoritos(app);
              });
            }
          }
        );
      },
      100 // Límite de items por página
    );
  } catch (err) {
    console.error("Error al cargar géneros favoritos:", err);
    error({ message: "No se pudieron cargar tus géneros favoritos." });
  }
};
