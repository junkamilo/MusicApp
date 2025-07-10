// artistProfile.js

import "./artistProfile.css"; // Asegúrate de que este CSS esté enlazado
import { contentCards } from '../ContentCards/contentCards.js';
import { cardAlbum } from '../cardAlbumes/cardAlbum.js';
import { cardCancion } from "../cardCancion/cardCancion.js";

/**
 * Renderiza el perfil completo de un artista, incluyendo su información, álbumes y canciones.
 * @param {string} artistaId - El ID del artista a mostrar.
 * @param {HTMLElement} contenedorPrincipal - El elemento DOM donde se renderizará todo el perfil.
 */
export const artistProfile = async (artistaId, contenedorPrincipal) => {
    if (!artistaId || !contenedorPrincipal) {
        console.error("Error: Se requiere un ID de artista y un contenedor principal.");
        return;
    }

    // Limpiar el contenedor principal antes de renderizar el nuevo perfil
    contenedorPrincipal.innerHTML = ''; // Mantener este para limpiar el contenedor inicial
    contenedorPrincipal.classList.add("artist_profile_container"); // Clase para el contenedor principal

    // Contenedores para las diferentes secciones
    const artistHeaderSection = document.createElement("section");
    artistHeaderSection.classList.add("artist_header_section");

    // Nuevo: Contenedor para el menú de navegación
    const navMenuContainer = document.createElement("nav");
    navMenuContainer.classList.add("artist_nav_menu");

    const albumsButton = document.createElement("button");
    albumsButton.classList.add("nav_button", "active"); // 'active' por defecto
    albumsButton.textContent = "Álbumes";

    const songsButton = document.createElement("button");
    songsButton.classList.add("nav_button");
    songsButton.textContent = "Canciones";

    navMenuContainer.appendChild(albumsButton);
    navMenuContainer.appendChild(songsButton);

    // Nuevo: Contenedor para el contenido dinámico (álbumes/canciones)
    const dynamicContentContainer = document.createElement("div");
    dynamicContentContainer.classList.add("artist_dynamic_content");

    const albumsSection = document.createElement("section");
    albumsSection.classList.add("artist_content_section", "albums_section"); // Añadimos clase específica
    
    const albumsTitleContainer = document.createElement("div");
    albumsTitleContainer.classList.add("content_titulos");
    const albumsTitle = document.createElement('h3');
    albumsTitle.textContent = "Álbumes";
    const albumsVerMas = document.createElement('a');
    albumsVerMas.href = `#/albumes/artista/${artistaId}`;
    albumsVerMas.classList.add("ver-mas");
    albumsVerMas.textContent = "Ver más";
    albumsTitleContainer.appendChild(albumsTitle);
    albumsTitleContainer.appendChild(albumsVerMas);

    const albumsCardsContainer = document.createElement("div");
    albumsCardsContainer.classList.add("content_cards");

    const songsSection = document.createElement("section");
    songsSection.classList.add("artist_content_section", "songs_section", "hidden"); // Oculto por defecto

    const songsTitleContainer = document.createElement("div");
    songsTitleContainer.classList.add("content_titulos");
    const songsTitle = document.createElement('h3');
    songsTitle.textContent = "Canciones Populares";
    const songsVerMas = document.createElement('a');
    songsVerMas.href = `#/canciones/artista/${artistaId}`;
    songsVerMas.classList.add("ver-mas");
    songsVerMas.textContent = "Ver más";
    songsTitleContainer.appendChild(songsTitle);
    songsTitleContainer.appendChild(songsVerMas);

    const songsCardsContainer = document.createElement("div");
    songsCardsContainer.classList.add("content_cards");

    // Añadir los contenedores de sección al contenedor principal
    contenedorPrincipal.appendChild(artistHeaderSection);
    contenedorPrincipal.appendChild(navMenuContainer); // Añadir el menú de navegación
    contenedorPrincipal.appendChild(dynamicContentContainer); // Añadir el contenedor dinámico

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
            fetch(`http://localhost:3000/canciones/artista/${artistaId}`, { headers })
        ]);

        const artistData = await artistResponse.json();
        const albumsData = await albumsResponse.json();
        const songsData = await songsResponse.json();

        if (!artistResponse.ok || artistData.error) {
            console.error("Error al obtener datos del artista:", artistData.message || artistResponse.statusText);
            const errorMessage = document.createElement('p');
            errorMessage.classList.add("error-message");
            errorMessage.textContent = "No se pudo cargar la información del artista.";
            contenedorPrincipal.appendChild(errorMessage);
            return;
        }

        // --- 2. Renderizar el encabezado del perfil del artista ---
        const artista = artistData;
        
        const headerContent = document.createElement("div");
        headerContent.classList.add("artist_header_content");

        const artistPhoto = document.createElement("img");
        artistPhoto.classList.add("artist_profile_photo");
        artistPhoto.src = artista.url_foto_artista || "./assets/default_artist_profile.png";
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
        
        const playIcon = document.createElement('i');
        playIcon.classList.add('fa-solid', 'fa-play');
        playArtistButton.appendChild(playIcon);
        playArtistButton.appendChild(document.createTextNode(' Reproducir'));

        playArtistButton.addEventListener("click", () => {
            console.log(`Reproduciendo discografía de ${artista.nombre_artista}`);
            // Lógica para iniciar la reproducción de la discografía del artista
        });

        artistInfo.appendChild(artistType);
        artistInfo.appendChild(artistName);
        artistInfo.appendChild(artistBio);
        artistInfo.appendChild(playArtistButton);

        headerContent.appendChild(artistPhoto);
        headerContent.appendChild(artistInfo);
        artistHeaderSection.appendChild(headerContent);

        // --- 3. Renderizar álbumes y canciones usando contentCards ---
        // Renderiza ambas secciones al inicio, pero una estará oculta
        if (albumsData.data && albumsData.data.length > 0) {
            contentCards(albumsData.data, albumsCardsContainer, cardAlbum);
        } else {
            const noAlbumsMessage = document.createElement('p');
            noAlbumsMessage.classList.add("no-content-message");
            noAlbumsMessage.textContent = "No hay álbumes disponibles para este artista.";
            albumsCardsContainer.appendChild(noAlbumsMessage);
        }

        if (songsData && songsData.length > 0) {
            contentCards(songsData, songsCardsContainer, cardCancion,songsData.length);
        } else {
            const noSongsMessage = document.createElement('p');
            noSongsMessage.classList.add("no-content-message");
            noSongsMessage.textContent = "No hay canciones disponibles para este artista.";
            songsCardsContainer.appendChild(noSongsMessage);
        }

    } catch (error) {
        console.error("Error al cargar el perfil del artista:", error);
        const errorMessage = document.createElement('p');
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Ocurrió un error al cargar el perfil del artista.";
        contenedorPrincipal.appendChild(errorMessage);
    }
};