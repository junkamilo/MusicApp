// artistProfile.js (AJUSTADO)

import "./artistProfile.css"; // Asegúrate de que este CSS esté enlazado
import { contentCards } from "../ContentCards/contentCards.js";
import { cardAlbum } from "../cardAlbumes/cardAlbum.js";
import { cardCancion } from "../cardCancion/cardCancion.js";
import { activarBuscadorGlobal } from "../../helpers/buscador.js";

/**
 * Renderiza el perfil completo de un artista, incluyendo su información, álbumes y canciones.
 * @param {string} artistaId - El ID del artista a mostrar.
 * @param {HTMLElement} contenedorPrincipal - El elemento DOM donde se renderizará todo el perfil.
 */
export const artistProfile = async (artistaId, contenedorPrincipal) => {
  if (!artistaId || !contenedorPrincipal) {
    console.error(
      "Error: Se requiere un ID de artista y un contenedor principal."
    );
    return;
  }

  // Limpiar el contenedor principal antes de renderizar el nuevo perfil
  contenedorPrincipal.innerHTML = "";
  contenedorPrincipal.classList.add("artist_profile_container"); // Clase para el contenedor principal

  // Contenedores para las diferentes secciones
  const artistHeaderSection = document.createElement("section");
  artistHeaderSection.classList.add("artist_header_section");

  // Nuevo: Contenedor principal para el contenido debajo del header (nav + dynamic content)
  const artistMainContent = document.createElement("div");
  artistMainContent.classList.add("artist_main_content");

  // Menú de navegación (Álbumes / Canciones)
  const navMenuContainer = document.createElement("nav");
  navMenuContainer.classList.add("artist_nav_menu");

  const albumsButton = document.createElement("button");
  albumsButton.classList.add("nav_button", "active"); // 'active' por defecto
  albumsButton.textContent = "Álbumes";

  const songsButton = document.createElement("button");
  songsButton.classList.add("nav_button");
  songsButton.textContent = "Canciones Populares"; // Cambiado para que coincida con el título de la sección

  navMenuContainer.appendChild(albumsButton);
  navMenuContainer.appendChild(songsButton);

  // Contenedor para el contenido dinámico (álbumes/canciones)
  const dynamicContentContainer = document.createElement("div");
  dynamicContentContainer.classList.add("artist_dynamic_content");

  // Secciones de Álbumes
  const albumsSection = document.createElement("section");
  albumsSection.classList.add("artist_content_section", "albums_section");

  const albumsTitleContainer = document.createElement("div");
  albumsTitleContainer.classList.add("content_titulos");
  const albumsTitle = document.createElement("h3");
  albumsTitle.textContent = "Álbumes";
  const albumsVerMas = document.createElement("a");
  albumsVerMas.href = `#/albumes/artista/${artistaId}`;
  albumsVerMas.classList.add("ver-mas");
  albumsVerMas.textContent = "Ver más";
  albumsTitleContainer.appendChild(albumsTitle);
  albumsTitleContainer.appendChild(albumsVerMas);

  const albumsCardsContainer = document.createElement("div");
  albumsCardsContainer.classList.add("content_cards");

  // Secciones de Canciones
  const songsSection = document.createElement("section");
  songsSection.classList.add(
    "artist_content_section",
    "songs_section",
    "hidden"
  ); // Oculto por defecto

  const songsTitleContainer = document.createElement("div");
  songsTitleContainer.classList.add("content_titulos");
  const songsTitle = document.createElement("h3");
  songsTitle.textContent = "Canciones Populares";
  const songsVerMas = document.createElement("a");
  songsVerMas.href = `#/canciones/artista/${artistaId}`;
  songsVerMas.classList.add("ver-mas");
  songsVerMas.textContent = "Ver más";
  songsTitleContainer.appendChild(songsTitle);
  songsTitleContainer.appendChild(songsVerMas);

  const songsCardsContainer = document.createElement("div");
  songsCardsContainer.classList.add("content_cards");

  // Ensamblar la estructura principal
  contenedorPrincipal.appendChild(artistHeaderSection);
  contenedorPrincipal.appendChild(artistMainContent); // Añadir el nuevo contenedor principal

  // Añadir el menú de navegación y el contenedor dinámico al artistMainContent
  artistMainContent.appendChild(navMenuContainer);
  artistMainContent.appendChild(dynamicContentContainer);

  // Añadir secciones de álbumes/canciones al contenedor dinámico
  dynamicContentContainer.appendChild(albumsSection);
  dynamicContentContainer.appendChild(songsSection);

  // Añadir títulos y contenedores de cards a sus respectivas secciones
  albumsSection.appendChild(albumsTitleContainer);
  albumsSection.appendChild(albumsCardsContainer);
  songsSection.appendChild(songsTitleContainer);
  songsSection.appendChild(songsCardsContainer);

  // --- Lógica para cambiar de vista (álbumes/canciones) ---
  const showSection = (sectionToShow) => {
    albumsSection.classList.add("hidden");
    songsSection.classList.add("hidden");
    albumsButton.classList.remove("active");
    songsButton.classList.remove("active");

    if (sectionToShow === "albums") {
      albumsSection.classList.remove("hidden");
      albumsButton.classList.add("active");
    } else if (sectionToShow === "songs") {
      songsSection.classList.remove("hidden");
      songsButton.classList.add("active");
    }
  };

  albumsButton.addEventListener("click", () => showSection("albums"));
  songsButton.addEventListener("click", () => showSection("songs"));

  // --- 1. Obtener datos del artista, álbumes y canciones ---
  try {
    const token = localStorage.getItem("accessToken");
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const [artistResponse, albumsResponse, songsResponse] = await Promise.all([
      fetch(`http://localhost:3000/artistas/${artistaId}`, { headers }),
      fetch(`http://localhost:3000/albumes/artista/${artistaId}`, { headers }),
      fetch(`http://localhost:3000/canciones/artista/${artistaId}`, {
        headers,
      }),
    ]);

    const artistData = await artistResponse.json();
    const albumsData = await albumsResponse.json();
    const songsData = await songsResponse.json();

    if (!artistResponse.ok || artistData.error) {
      console.error(
        "Error al obtener datos del artista:",
        artistData.message || artistResponse.statusText
      );
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent =
        "No se pudo cargar la información del artista.";
      contenedorPrincipal.appendChild(errorMessage);
      return;
    }

    // --- 2. Renderizar el encabezado del perfil del artista ---
    const artista = artistData;

    const headerContent = document.createElement("div");
    headerContent.classList.add("artist_header_content");

    const artistPhoto = document.createElement("img");
    artistPhoto.classList.add("artist_profile_photo");
    artistPhoto.src =
      artista.url_foto_artista || "./assets/default_artist_profile.png";
    artistPhoto.alt = artista.nombre_artista;

    const artistInfo = document.createElement("div");
    artistInfo.classList.add("artist_info");

    const artistType = document.createElement("p");
    artistType.classList.add("artist_type");
    artistType.textContent = "Artista";

    const artistName = document.createElement("h1");
    artistName.classList.add("artist_name");
    artistName.textContent = artista.nombre_artista;

    const artistBio = document.createElement("p");
    artistBio.classList.add("artist_bio");
    artistBio.textContent = artista.biografia || "Biografía no disponible.";

    // Botón de Play para el artista (Ej. Reproducir discografía)
    const playArtistButton = document.createElement("button");
    playArtistButton.classList.add("play_artist_button");

    const playIcon = document.createElement("i");
    playIcon.classList.add("fa-solid", "fa-play");
    playArtistButton.appendChild(playIcon);
    playArtistButton.appendChild(document.createTextNode(" Reproducir"));

    playArtistButton.addEventListener("click", () => {
  if (!songsData || songsData.length === 0) {
    console.warn("Este artista no tiene canciones para reproducir.");
    return;
  }

  const cancion = songsData[0]; // Puedes cambiar el índice si quieres otra canción
  const {
    titulo_cancion,
    artista_cancion,
    url_portada_album,
    url_archivo_audio,
  } = cancion;

  if (!url_archivo_audio) {
    console.error("❌ No se encontró archivo de audio para reproducir.");
    return;
  }

  const audio = document.getElementById("audioPlayer");
  const footer = document.getElementById("footerPlayer");
  const playerCover = document.getElementById("playerCover");
  const playerTitle = document.getElementById("playerTitle");
  const playerArtist = document.getElementById("playerArtist");

  const host = window.location.hostname;
  const audioURL = `http://${host}:3000/uploads${encodeURI(url_archivo_audio)}`;

  if (footer) footer.classList.remove("hidden");
  if (playerCover) playerCover.src = url_portada_album || "./assets/default_cover.png";
  if (playerTitle) playerTitle.textContent = titulo_cancion;
  if (playerArtist) playerArtist.textContent = artista_cancion;

  if (audio) {
    audio.src = audioURL;
    audio.onerror = () => {
      console.error("❌ Error al cargar el audio:", audio.src);
    };
    audio.play();
  }

  console.log(`▶️ Reproduciendo canción de perfil: ${titulo_cancion}`);
});



    artistInfo.appendChild(artistType);
    artistInfo.appendChild(artistName);
    artistInfo.appendChild(artistBio);
    artistInfo.appendChild(playArtistButton);

    headerContent.appendChild(artistPhoto);
    headerContent.appendChild(artistInfo);
    artistHeaderSection.appendChild(headerContent);

    // --- 3. Renderizar álbumes y canciones usando contentCards ---
    if (albumsData.data && albumsData.data.length > 0) {
      contentCards(albumsData.data, albumsCardsContainer, cardAlbum);
    } else {
      const noAlbumsMessage = document.createElement("p");
      noAlbumsMessage.classList.add("no-content-message");
      noAlbumsMessage.textContent =
        "No hay álbumes disponibles para este artista.";
      albumsCardsContainer.appendChild(noAlbumsMessage);
    }

    if (songsData && songsData.length > 0) {
      contentCards(
        songsData,
        songsCardsContainer,
        cardCancion,
        songsData.length
      );
      // Asignar IDs únicos a los contenedores para buscador
      albumsCardsContainer.id = "albumsCardsContainer_" + artistaId;
      songsCardsContainer.id = "songsCardsContainer_" + artistaId;

      // Activar buscador en álbumes y canciones
      activarBuscadorGlobal([albumsCardsContainer.id, songsCardsContainer.id]);
    } else {
      const noSongsMessage = document.createElement("p");
      noSongsMessage.classList.add("no-content-message");
      noSongsMessage.textContent =
        "No hay canciones disponibles para este artista.";
      songsCardsContainer.appendChild(noSongsMessage);
    }
  } catch (error) {
    console.error("Error al cargar el perfil del artista:", error);
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent =
      "Ocurrió un error al cargar el perfil del artista.";
    contenedorPrincipal.appendChild(errorMessage);
  }
};
