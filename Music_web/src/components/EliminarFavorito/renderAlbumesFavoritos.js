

import { error } from "../../helpers/alerts";
import { cardAlbum } from "../cardAlbumes/cardAlbum";
import { contentCards } from "../ContentCards/contentCards";
import { headerFavoritos } from "../headerFavoritos/headerFavoritos";
import { eliminarAlbumFavorito, eliminarTodosAlbumesFavoritos } from "./eliminarAlbumFavorito";

export const renderAlbumesFavorito = async (app) => {
    app.innerHTML = ""; // Limpia el contenedor principal

    const token = localStorage.getItem("accessToken");
    if (!token) {
        window.location.hash = "#Login";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/albumes/favoritos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json(); // Obtener el objeto completo
        const data = result.data; // Acceder al array de datos

        if (!response.ok || result.error) {
            error({ message: result.message || "Error al obtener álbumes favoritos" });
            return;
        }

        // 1️⃣ Renderiza el header de favoritos
        const header = headerFavoritos({
            tipo: "Álbumes",
            titulo: "Tus álbumes favoritos",
            usuario: "Juan Camilo", // Puedes obtener esto del usuario logueado
            cantidad: data.length,
            tipoItem: "álbumes",
            avatarUrl: "./assets/perfil_default.png",
        });
        app.appendChild(header);

        // 2️⃣ Botón eliminar todos (si hay álbumes)
        const btnEliminarTodosContainer = document.createElement("div");
        btnEliminarTodosContainer.classList.add("eliminar_todos_container"); // Contenedor para el botón
        
        if (data.length > 0) {
            const btnEliminarTodos = document.createElement("button");
            btnEliminarTodos.textContent = "Eliminar todos los álbumes favoritos";
            btnEliminarTodos.classList.add("btn_eliminar_todos_generos"); // Clase específica
            
            btnEliminarTodos.addEventListener("click", async () => {
                await eliminarTodosAlbumesFavoritos(() => renderAlbumesFavorito(app)); // Recarga la lista
            });
            btnEliminarTodosContainer.appendChild(btnEliminarTodos);
        }
        app.appendChild(btnEliminarTodosContainer);


        // 3️⃣ Contenedor para las cards de álbumes
        const contenedorCards = document.createElement("div");
        contenedorCards.classList.add("contenedor_cards_generos"); // Clase específica para el grid
        app.appendChild(contenedorCards);

        // 4️⃣ Usa contentCards para renderizar usando cardAlbum
        contentCards(data, contenedorCards, (items, containerElement) => {
            items.forEach(({ album_id, titulo_album, url_portada_album, artista_id, nombre_artista }) => {
                // Pasamos isFavoritePage = true y el callback de eliminación
                cardAlbum(
                    [{ album_id, titulo_album, url_portada_album, artista_id, nombre_artista }], // cardAlbum espera un array
                    containerElement,
                    true, // isFavoritePage: true
                    async (id, name) => { // onDeleteCallback
                        await eliminarAlbumFavorito(id, name, () => {
                            // EliminadoAlbumFavorito(name); // La alerta ya se muestra en eliminarAlbumFavorito
                            renderAlbumesFavorito(app); // Recarga la lista
                        });
                    }
                );
            });
        }, 100); // Puedes ajustar el límite si es necesario

    } catch (err) {
        console.error("Error al cargar álbumes favoritos:", err);
        error({ message: "No se pudieron cargar tus álbumes favoritos." });
    }
};