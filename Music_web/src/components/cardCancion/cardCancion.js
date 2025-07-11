// cardCancion.js (MODIFICADO)

import { AgregadoCancionFavoritos, error, success } from "../../helpers/alerts";
import { agregarCancionFavorita } from "../../helpers/apiFavoritos";
import "./cardCancion.css"; // CSS para la card de canción

/**
 * Crea un elemento de tarjeta para una canción.
 * Puede mostrar un botón de favorito o un botón de eliminar, dependiendo de los parámetros.
 * @param {Array} data - Un array que contiene un objeto de canción.
 * @param {HTMLElement} contenedor - El elemento DOM donde se añadirá la tarjeta.
 * @param {boolean} [isFavoritePage=false] - Indica si la card se renderiza en la página de favoritos.
 * @param {Function} [onDeleteCallback=null] - Función a llamar al eliminar (solo si isFavoritePage es true).
 */
export const cardCancion = (
  data = [],
  contenedor,
  isFavoritePage = false,
  onDeleteCallback = null
) => {
  if (!Array.isArray(data) || !contenedor) return;

  data.forEach(
    ({
      cancion_id,
      titulo_cancion,
      artista_cancion,
      url_portada_album,
      url_archivo_audio,
      favorito = false, // Mantener por si se usa en otras vistas
    }) => {
      const card = document.createElement("div");
      card.classList.add("card_cancion", "card_cancion_innovadora");

      // Envoltura para la imagen de la canción/álbum
      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("imagen_cancion_wrapper");

      const img = document.createElement("img");
      img.classList.add("imagen_cancion");
      img.src =
        url_portada_album ||
        "https://placehold.co/140x140/8A2BE2/FFFFFF?text=Cancion"; // Placeholder
      img.alt = titulo_cancion;
      imgWrapper.appendChild(img);

      // Botón de Reproducción
      const playButton = document.createElement("button");
      playButton.classList.add("btn_play_cancion");
      playButton.innerHTML = '<i class="fa-solid fa-play"></i>'; // Usar Font Awesome
      playButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita redirección

        // Mostrar el reproductor (asumiendo que estos elementos existen en tu HTML global)
        const footer = document.getElementById("footerPlayer");
        if (footer) footer.classList.remove("hidden");

        const playerCover = document.getElementById("playerCover");
        const playerTitle = document.getElementById("playerTitle");
        const playerArtist = document.getElementById("playerArtist");

        if (playerCover) playerCover.src = img.src;
        if (playerTitle) playerTitle.textContent = titulo_cancion;
        if (playerArtist) playerArtist.textContent = artista_cancion;

        // Reproducir audio
        const audio = document.getElementById("audioPlayer");
        const host = window.location.hostname;
        if (!url_archivo_audio) {
          console.error(
            "❌ No se encontró la URL del audio para:",
            titulo_cancion
          );
          // Usar una alerta personalizada en lugar de alert()
          // alert(`No se puede reproducir "${titulo_cancion}" porque no tiene archivo de audio asignado.`);
          return;
        }

        const audioURL = `http://${host}:3000/uploads${encodeURI(
          url_archivo_audio
        )}`;
        console.log("🎧 URL audio:", audioURL);

        if (audio) {
          audio.src = audioURL;
          audio.onerror = () => {
            console.error("❌ Error al cargar el audio:", audio.src);
            // Usar una alerta personalizada
            // alert("Error al cargar el archivo de audio. Verifica que exista en el servidor.");
          };
          audio.play();
        }

        console.log(`▶️ Reproduciendo: ${titulo_cancion}`);
      });
      imgWrapper.appendChild(playButton);
      card.appendChild(imgWrapper);

      // Info título y artista
      const infoContainer = document.createElement("div");
      infoContainer.classList.add("info_cancion_container");

      const titulo = document.createElement("h3");
      titulo.classList.add("titulo_cancion");
      titulo.textContent = titulo_cancion;
      infoContainer.appendChild(titulo);

      const artista = document.createElement("p");
      artista.classList.add("artista_cancion");
      artista.textContent = artista_cancion;
      infoContainer.appendChild(artista);

      card.appendChild(infoContainer);

      // --- Lógica del botón (Corazón o Eliminar) ---
      if (isFavoritePage && onDeleteCallback) {
        // Si estamos en la página de favoritos, agregamos el botón de eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn_accion_card_cancion"); // Clase general para botones de acción
        btnEliminar.classList.add("btn_eliminar_cancion"); // Clase específica para eliminar
        btnEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>'; // Icono de Font Awesome
        btnEliminar.setAttribute("title", "Eliminar esta canción favorita");

        btnEliminar.addEventListener("click", async (e) => {
          e.stopPropagation(); // Evita que el clic en el botón active el evento de la card
          await onDeleteCallback(cancion_id, titulo_cancion); // Llama al callback
        });
        card.appendChild(btnEliminar);
      } else {
        const botonFavorito = document.createElement("button");
        botonFavorito.classList.add(
          "btn_accion_card_cancion",
          "btn_favorito_cancion"
        ); // Clase para el corazón
        botonFavorito.innerHTML = favorito ? "❤️" : "🤍"; // Emojis por defecto
        botonFavorito.addEventListener("click", async (e) => {
          e.stopPropagation();
          favorito = !favorito;
          botonFavorito.innerHTML = favorito ? "❤️" : "🤍";
          console.log(`Favorito: ${titulo_cancion}`, favorito);

          if (favorito) {
            try {
              const result = await agregarCancionFavorita(cancion_id);
              if (result && !result.error) {
                AgregadoCancionFavoritos(titulo_cancion);
              } else {
                error({
                  message: result.message || "No se pudo agregar a favoritos",
                });
              }
            } catch (err) {
              error({ message: "Error al agregar a favoritos" });
            }
          } else {
            // Aquí puedes agregar lógica para eliminar de favoritos si es necesario
            console.log(
              `"${titulo_cancion}" fue removida (lógica aún no implementada)`
            );
          }
        });

        card.appendChild(botonFavorito);
      }

      // Hover efecto
      card.addEventListener("mouseenter", () => {
        card.classList.add("card_cancion_hover");
      });
      card.addEventListener("mouseleave", () => {
        card.classList.remove("card_cancion_hover");
      });

      // Redirección
      card.addEventListener("click", () => {
        if (cancion_id) {
          window.location.href = `#/canciones/${cancion_id}`;
        }
      });

      contenedor.appendChild(card);
    }
  );
};
