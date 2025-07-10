import { cardCancion } from "../cardCancion/cardCancion";
import { contentCards } from "../ContentCards/contentCards";
import "./albumProfile.css"; // Asegúrate de que este CSS esté enlazado

/**
 * Renderiza el perfil completo de un álbum, incluyendo su información y sus canciones.
 * @param {string} albumId - El ID del álbum a mostrar.
 * @param {HTMLElement} contenedorPrincipal - El elemento DOM donde se renderizará todo el perfil.
 */
export const albumProfile = async (albumId, contenedorPrincipal) => {
    console.log("✅ Renderizando perfil del álbum:", albumId);

    if (!albumId || !contenedorPrincipal) {
        console.error("Error: Se requiere un ID de álbum y un contenedor principal.");
        return;
    }

    // Limpiar el contenedor principal antes de renderizar el nuevo perfil
    contenedorPrincipal.innerHTML = ''; // Mantener este para limpiar el contenedor inicial
    contenedorPrincipal.classList.add("album_profile_container"); // Clase para el contenedor principal

    // Contenedores para las diferentes secciones
    const albumHeaderSection = document.createElement("section");
    albumHeaderSection.classList.add("album_header_section");

    const songsSection = document.createElement("section");
    songsSection.classList.add("album_content_section"); // Reutilizamos una clase similar a artist_content_section
    
    const songsTitleContainer = document.createElement("div");
    songsTitleContainer.classList.add("content_titulos"); // Reutilizamos clase de títulos
    const songsTitle = document.createElement('h3');
    songsTitle.textContent = "Canciones del Álbum";
    songsTitleContainer.appendChild(songsTitle);

    const songsCardsContainer = document.createElement("div");
    songsCardsContainer.classList.add("content_cards"); // Reutilizamos clase de content_cards

    // Añadir los contenedores de sección al contenedor principal
    contenedorPrincipal.appendChild(albumHeaderSection);
    contenedorPrincipal.appendChild(songsSection);

    // Añadir títulos y contenedores de cards a sus respectivas secciones
    songsSection.appendChild(songsTitleContainer);
    songsSection.appendChild(songsCardsContainer);

    // --- 1. Obtener datos del álbum y sus canciones ---
    try {
        const token = localStorage.getItem("accessToken"); // Asumiendo que necesitas token
        const headers = { "Content-Type": "application/json" };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const [albumResponse, songsResponse] = await Promise.all([
            fetch(`http://localhost:3000/albumes/${albumId}`, { headers }),
            fetch(`http://localhost:3000/albumes/${albumId}/canciones`, { headers })
        ]);

        const albumJson = await albumResponse.json();
        const albumData = albumJson.data;
        const songsJson = await songsResponse.json();
        const songsData = songsJson.data || [];

        if (!albumResponse.ok || albumData.error) {
            console.error("Error al obtener datos del álbum:", albumData.message || albumResponse.statusText);
            const errorMessage = document.createElement('p');
            errorMessage.classList.add("error-message");
            errorMessage.textContent = "No se pudo cargar la información del álbum.";
            contenedorPrincipal.appendChild(errorMessage);
            return;
        }

        // --- 2. Renderizar el encabezado del perfil del álbum ---
        const album = albumData; // Accede a la propiedad 'data'
        
        const headerContent = document.createElement("div");
        headerContent.classList.add("album_header_content");

        const albumCover = document.createElement("img");
        albumCover.classList.add("album_profile_cover");
        albumCover.src = album.url_portada_album || "./assets/default_album_cover.png";
        albumCover.alt = album.titulo_album;

        const albumInfo = document.createElement("div");
        albumInfo.classList.add("album_info");

        const albumType = document.createElement("p");
        albumType.classList.add("album_type");
        albumType.textContent = "Álbum";

        const albumTitle = document.createElement("h1");
        albumTitle.classList.add("album_title");
        albumTitle.textContent = album.titulo_album;

        // Mostrar el artista del álbum (asumiendo que la API del álbum devuelve el nombre del artista)
        // Si no lo devuelve, necesitarías un fetch adicional a /artistas/{artista_id}
        const albumArtist = document.createElement("p");
        albumArtist.classList.add("album_artist");
        // Enlace al perfil del artista
        const artistLink = document.createElement('a');
        artistLink.href = `#/artistas/${album.artista_id}`; // Asumiendo que album.artista_id está disponible
        artistLink.textContent = album.nombre_artista || "Artista Desconocido"; // Asumiendo que album.nombre_artista está disponible
        albumArtist.appendChild(artistLink);

        const albumReleaseDate = document.createElement("p");
        albumReleaseDate.classList.add("album_release_date");
        // Formatear la fecha si viene en un formato diferente
        const fecha = album.fecha_album ? new Date(album.fecha_album).getFullYear() : "Año Desconocido";
        albumReleaseDate.textContent = `Año: ${fecha}`;

        const albumDescription = document.createElement("p");
        albumDescription.classList.add("album_description");
        albumDescription.textContent = album.descripcion || "Descripción no disponible.";

        // Botón de Play para el álbum (Ej. Reproducir todas las canciones del álbum)
        const playAlbumButton = document.createElement("button");
        playAlbumButton.classList.add("play_album_button");
        
        const playIcon = document.createElement('i');
        playIcon.classList.add('fa-solid', 'fa-play');
        playAlbumButton.appendChild(playIcon);
        playAlbumButton.appendChild(document.createTextNode(' Reproducir Álbum'));

        playAlbumButton.addEventListener("click", () => {
            console.log(`Reproduciendo álbum: ${album.titulo_album}`);
            // Lógica para iniciar la reproducción de todas las canciones del álbum
        });

        albumInfo.appendChild(albumType);
        albumInfo.appendChild(albumTitle);
        albumInfo.appendChild(albumArtist);
        albumInfo.appendChild(albumReleaseDate);
        albumInfo.appendChild(albumDescription);
        albumInfo.appendChild(playAlbumButton);

        headerContent.appendChild(albumCover);
        headerContent.appendChild(albumInfo);
        albumHeaderSection.appendChild(headerContent);


        // --- 3. Renderizar canciones usando contentCards ---
        if (songsData && songsData.length > 0) {
            contentCards(songsData, songsCardsContainer, cardCancion, songsData.length); // Mostrar todas las canciones
        } else {
            const noSongsMessage = document.createElement('p');
            noSongsMessage.classList.add("no-content-message");
            noSongsMessage.textContent = "No hay canciones disponibles en este álbum.";
            songsCardsContainer.appendChild(noSongsMessage);
        }

    } catch (error) {
        console.error("Error al cargar el perfil del álbum:", error);
        const errorMessage = document.createElement('p');
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Ocurrió un error al cargar el perfil del álbum.";
        contenedorPrincipal.appendChild(errorMessage);
    }
};