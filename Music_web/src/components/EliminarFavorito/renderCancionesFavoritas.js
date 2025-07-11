import { headerFavoritos } from "../../components/headerFavoritos/headerFavoritos.js";
import { contentCards } from "../../components/ContentCards/contentCards.js";
import { cardCancion } from "../../components/cardCancion/cardCancion.js";

import {
  eliminarCancionFavorita,
  eliminarTodasCancionesFavoritas,
} from "../../helpers/apiEliminarFavoritos.js";
import {
  confirmarEliminarCancion,
  confirmarEliminarTodasCanciones,
  EliminadoCancionFavorita,
  EliminadoTodosCancionesFavoritas,
  error,
} from "../../helpers/alerts.js";

export const renderCancionesFavoritas = async (app) => {
  app.innerHTML = ""; // 🧹 Limpia el contenedor principal

  const token = localStorage.getItem("accessToken");
  if (!token) {
    window.location.hash = "#Login";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/canciones/favoritos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    const data = result.data;

    if (!response.ok || result.error) {
      error({
        message: result.message || "Error al obtener canciones favoritas",
      });
      return;
    }

    // 1️⃣ Header personalizado para favoritos
    const header = headerFavoritos({
      tipo: "Canciones",
      titulo: "Tus canciones favoritas",
      usuario: "Juan Camilo",
      cantidad: data.length,
      tipoItem: "canciones",
      avatarUrl: "./assets/perfil_default.png",
    });
    app.appendChild(header);

    // 2️⃣ Botón eliminar todas las canciones favoritas
    const btnEliminarTodosContainer = document.createElement("div");
    btnEliminarTodosContainer.classList.add("eliminar_todos_container");

    if (data.length > 0) {
      const btnEliminarTodos = document.createElement("button");
      btnEliminarTodos.textContent = "Eliminar todas las canciones favoritas";
      btnEliminarTodos.classList.add("btn_eliminar_todos_generos");

      btnEliminarTodos.addEventListener("click", async () => {
        const confirmacion = await confirmarEliminarTodasCanciones();
        if (confirmacion.isConfirmed) {
          await eliminarTodasCancionesFavoritas(() => {
            EliminadoTodosCancionesFavoritas();
            renderCancionesFavoritas(app);
          });
        }
      });
      btnEliminarTodosContainer.appendChild(btnEliminarTodos);
    }

    app.appendChild(btnEliminarTodosContainer);

    // 3️⃣ Contenedor para las cards
    const contenedorCards = document.createElement("div");
    contenedorCards.classList.add("contenedor_cards_generos");
    app.appendChild(contenedorCards);

    // 4️⃣ Render de las canciones favoritas
    contentCards(
      data,
      contenedorCards,
      (items, containerElement) => {
        items.forEach(
          ({
            cancion_id,
            titulo_cancion,
            artista_cancion,
            url_portada_album,
            url_archivo_audio,
          }) => {
            cardCancion(
              [
                {
                  cancion_id,
                  titulo_cancion,
                  artista_cancion,
                  url_portada_album,
                  url_archivo_audio,
                },
              ],
              containerElement,
              true,
              async (id, name) => {
                const confirmacion = await confirmarEliminarCancion(name);
                if (confirmacion.isConfirmed) {
                  await eliminarCancionFavorita(id);
                  EliminadoCancionFavorita(name);
                  await renderCancionesFavoritas(app);
                }
              }
            );
          }
        );
      },
      100
    );
  } catch (err) {
    console.error("Error al cargar canciones favoritas:", err);
    error({ message: "No se pudieron cargar tus canciones favoritas." });
  }
};
