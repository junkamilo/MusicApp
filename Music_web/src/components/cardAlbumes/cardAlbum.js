import { AgregadoAlbumFavorito } from "../../helpers/alerts";
import { agregarAlbumAFavoritos } from "../../helpers/apiFavoritos";
import "./cardAlbum.css";

/**
 * Crea tarjetas de álbum con opción de favorito o eliminar.
 * @param {Array} data - Lista de objetos de álbum.
 * @param {HTMLElement} contenedor - Elemento contenedor donde se insertarán las tarjetas.
 * @param {boolean} [isFavoritePage=false] - Indica si se muestra en la sección de favoritos.
 * @param {Function} [onDeleteCallback=null] - Función que se llama al eliminar (solo si isFavoritePage).
 */
export const cardAlbum = (
  data = [],
  contenedor,
  isFavoritePage = false,
  onDeleteCallback = null
) => {
  if (!Array.isArray(data) || !contenedor) return;

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  console.log("user:", user);
  console.log("userId extraído:", userId);

  data.forEach(
    ({
      album_id,
      titulo_album,
      url_portada_album,
      imagen_album,
      nombre_artista,
      artista_id,
      favorito = false,
    }) => {
      const card = document.createElement("div");
      card.classList.add("card_album", "card_album_innovadora", "card");

      // Imagen
      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("imagen_album_wrapper");
      const img = document.createElement("img");
      img.classList.add("imagen_album");
      img.src =
        url_portada_album || imagen_album || "./assets/default_album_cover.png";
      img.alt = titulo_album;
      imgWrapper.appendChild(img);
      card.appendChild(imgWrapper);

      // Info (título + artista)
      const infoContainer = document.createElement("div");
      infoContainer.classList.add("info_album_container");

      const titulo = document.createElement("h3");
      titulo.classList.add("titulo_album");
      titulo.textContent = titulo_album;
      infoContainer.appendChild(titulo);

      if (nombre_artista) {
        const artista = document.createElement("p");
        artista.classList.add("artista_album");

        const artistLink = document.createElement("a");
        artistLink.href = `#/artistas/${artista_id || ""}`;
        artistLink.textContent = nombre_artista;
        artista.appendChild(artistLink);
        infoContainer.appendChild(artista);
      }

      card.appendChild(infoContainer);

      // Botón de acción
      if (isFavoritePage && typeof onDeleteCallback === "function") {
        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add(
          "btn_accion_card_album",
          "btn_eliminar_album"
        );

        const iconTrash = document.createElement("i");
        iconTrash.classList.add("fa-solid", "fa-trash");
        btnEliminar.appendChild(iconTrash);
        btnEliminar.title = "Eliminar este álbum favorito";

        btnEliminar.addEventListener("click", async (e) => {
          e.stopPropagation();
          await onDeleteCallback(album_id, titulo_album);
        });

        card.appendChild(btnEliminar);
      } else {
        const botonFavorito = document.createElement("button");
        botonFavorito.classList.add(
          "btn_accion_card_album",
          "btn_favorito_album"
        );
        botonFavorito.title = "Agregar a favoritos";

        const iconoCorazon = document.createElement("span");
        iconoCorazon.textContent = favorito ? "❤️" : "🤍";
        botonFavorito.appendChild(iconoCorazon);

        botonFavorito.addEventListener("click", async (e) => {
          e.preventDefault();
          e.stopPropagation();

          const token = localStorage.getItem("accessToken");
          if (!token) {
            window.location.hash = "#Login";
            return;
          }

          const resultado = await agregarAlbumAFavoritos(album_id);
          if (!resultado.ok) {
            console.error(
              "Error al agregar álbum favorito:",
              resultado.message
            );
            iconoCorazon.textContent = "🤍";
            return;
          }

          iconoCorazon.textContent = "❤️";
          AgregadoAlbumFavorito(titulo_album);
        });

        card.appendChild(botonFavorito);
      }

      // Redirección
      card.addEventListener("click", () => {
        if (album_id) {
          window.location.href = `#/albumes/${album_id}`;
        } else {
          console.warn(`Álbum sin ID: ${titulo_album}`);
        }
      });

      // Hover
      card.addEventListener("mouseenter", () =>
        card.classList.add("card_album_hover")
      );
      card.addEventListener("mouseleave", () =>
        card.classList.remove("card_album_hover")
      );

      contenedor.appendChild(card);
    }
  );
};
