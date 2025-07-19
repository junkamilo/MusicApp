import { AgregadoCancionFavoritos, error } from "../../helpers/alerts";
import { agregarCancionFavorita } from "../../helpers/apiFavoritos";
import { estaAutenticado } from "../../helpers/auth";

import "./cardCancion.css";

export const cardCancion = (
  data = [],
  contenedor,
  isFavoritePage = false,
  onDeleteCallback = null,
  isUserSong = false
) => {
  if (!Array.isArray(data) || !contenedor) return;

  data.forEach((cancion) => {
    const {
      cancion_id,
      id_cancion,
      titulo_cancion,
      artista_cancion,
      artista,
      url_portada_album,
      portada,
      url_archivo_audio,
      favorito = false,
    } = cancion;

    const id = cancion_id || id_cancion;
    const artistaFinal = artista_cancion || artista || "Artista desconocido";
    const portadaFinal = url_portada_album || portada || "https://placehold.co/140x140/8A2BE2/FFFFFF?text=Cancion";

    const card = document.createElement("div");
    card.classList.add("card_cancion", "card_cancion_innovadora", "card");

    // --- Imagen + botón Play ---
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("imagen_cancion_wrapper");

    const img = document.createElement("img");
    img.classList.add("imagen_cancion");
    img.src = portadaFinal;
    img.alt = titulo_cancion;

    const playButton = document.createElement("button");
    playButton.classList.add("btn_play_cancion");
    playButton.innerHTML = '<i class="fa-solid fa-play"></i>';

    playButton.addEventListener("click", (e) => {
      e.stopPropagation();

      if (!estaAutenticado()) {
        window.location.hash = "#Login";
        return;
      }

      const footer = document.getElementById("footerPlayer");
      if (footer) footer.classList.remove("hidden");

      const playerCover = document.getElementById("playerCover");
      const playerTitle = document.getElementById("playerTitle");
      const playerArtist = document.getElementById("playerArtist");

      if (playerCover) playerCover.src = img.src;
      if (playerTitle) playerTitle.textContent = titulo_cancion;
      if (playerArtist) playerArtist.textContent = artistaFinal;

      const audio = document.getElementById("audioPlayer");
      const host = window.location.hostname;

      if (!url_archivo_audio) {
        console.error("❌ No se encontró la URL del audio para:", titulo_cancion);
        return;
      }

      const audioURL = `http://${host}:3000/uploads/${encodeURI(url_archivo_audio)}`;
      if (audio) {
        audio.src = audioURL;
        audio.onerror = () => {
          console.error("❌ Error al cargar el audio:", audio.src);
        };
        audio.play();
      }

      console.log(`▶️ Reproduciendo: ${titulo_cancion}`);
    });

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(playButton);
    card.appendChild(imgWrapper);

    // --- Título y artista ---
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info_cancion_container");

    const titulo = document.createElement("h3");
    titulo.classList.add("titulo_cancion");
    titulo.textContent = titulo_cancion;

    const artistaTexto = document.createElement("p");
    artistaTexto.classList.add("artista_cancion");
    artistaTexto.textContent = artistaFinal;

    infoContainer.appendChild(titulo);
    infoContainer.appendChild(artistaTexto);
    card.appendChild(infoContainer);

    // --- Botón favorito o eliminar ---
    if ((isFavoritePage || isUserSong) && typeof onDeleteCallback === "function") {
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn_accion_card_cancion", "btn_eliminar_cancion");
      btnEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>';
      btnEliminar.setAttribute("title", "Eliminar esta canción");

      btnEliminar.addEventListener("click", async (e) => {
        e.stopPropagation();
        await onDeleteCallback(id, titulo_cancion);
      });

      card.appendChild(btnEliminar);
    } else {
      const botonFavorito = document.createElement("button");
      botonFavorito.classList.add("btn_accion_card_cancion", "btn_favorito_cancion");
      botonFavorito.innerHTML = favorito ? "❤️" : "🤍";

      botonFavorito.addEventListener("click", async (e) => {
        e.stopPropagation();

        if (!estaAutenticado()) {
          window.location.hash = "#Login";
          return;
        }

        const nuevoEstado = !favorito;
        botonFavorito.innerHTML = nuevoEstado ? "❤️" : "🤍";

        if (nuevoEstado) {
          try {
            const result = await agregarCancionFavorita(id);
            if (result && !result.error) {
              AgregadoCancionFavoritos(titulo_cancion);
            } else {
              error({ message: result.message || "No se pudo agregar a favoritos" });
            }
          } catch (err) {
            error({ message: "Error al agregar a favoritos" });
          }
        } else {
          console.log(`"${titulo_cancion}" fue removida (lógica aún no implementada)`);
        }
      });

      card.appendChild(botonFavorito);
    }

    // --- Hover visual ---
    card.addEventListener("mouseenter", () => {
      card.classList.add("card_cancion_hover");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("card_cancion_hover");
    });

    // --- Click redirección a detalle ---
    card.addEventListener("click", () => {
      if (!estaAutenticado()) {
        window.location.hash = "#Login";
        return;
      }

      if (id) {
        window.location.hash = `#/canciones/${id}`;
      }
    });

    contenedor.appendChild(card);
  });
};


