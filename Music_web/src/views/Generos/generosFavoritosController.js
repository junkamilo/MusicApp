import {
  eliminarGeneroFavorito,
  eliminarTodosGenerosFavoritos,
} from "../../components/EliminarFavorito/eliminarGeneroFavorito.js";
import { headerFavoritos } from "../../components/headerFavoritos/headerFavoritos.js";
import { EliminadoGeneroFavorito, error } from "../../helpers/alerts.js";

export const generosFavoritosController = async () => {
  const token = localStorage.getItem("accessToken");
  const app = document.getElementById("app");

  // Limpia el contenedor por si acaso
  app.innerHTML = "";

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

    // HEADER
    const header = headerFavoritos({
      tipo: "Géneros",
      titulo: "Tus géneros favoritos",
      usuario: "Juan Camilo",
      cantidad: data.length,
      tipoItem: "géneros",
      avatarUrl: "./assets/perfil_default.png",
    });

    app.appendChild(header);

    // Botón eliminar todos (si hay géneros)
    if (data.length > 0) {
      const btnEliminarTodos = document.createElement("button");
      btnEliminarTodos.textContent = "Eliminar todos los géneros favoritos";
      btnEliminarTodos.classList.add("btn_eliminar_todos_generos");

      btnEliminarTodos.addEventListener("click", async () => {
        await eliminarTodosGenerosFavoritos(() => generosFavoritosController());
      });

      app.appendChild(btnEliminarTodos);
    }

    // LISTA DE CARDS
    const lista = document.createElement("div");
    lista.classList.add("lista_generos_favoritos");

    data.forEach(({ genero_id, nombre_genero }) => {
      const card = document.createElement("div");
      card.classList.add("card_genero_favorito");

      // Nombre del género
      const nombre = document.createElement("p");
      nombre.textContent = nombre_genero;

      // Botón ❌ para eliminar solo ese género
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "❌";
      btnEliminar.classList.add("btn_eliminar_genero");
      btnEliminar.title = "Eliminar este género favorito";

      btnEliminar.addEventListener("click", async (e) => {
        e.stopPropagation();

        await eliminarGeneroFavorito(genero_id, () => {
          EliminadoGeneroFavorito(nombre_genero); // ✅ aquí se muestra el Swal
          generosFavoritosController(); // recarga la lista
        });
      });

      // Redirección al hacer clic en la card
      card.addEventListener("click", () => {
        window.location.hash = `#/generosMusicales/${genero_id}`;
      });

      card.appendChild(nombre);
      card.appendChild(btnEliminar);
      lista.appendChild(card);
    });

    app.appendChild(lista);
  } catch (err) {
    console.error("Error al cargar géneros favoritos:", err);
    error({ message: "No se pudieron cargar tus géneros favoritos." });
  }
};
