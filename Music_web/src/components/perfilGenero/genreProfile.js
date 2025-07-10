// genreProfile.js

// Importa los componentes y utilidades necesarios
import { contentCards } from '../ContentCards/contentCards.js'; // Asegúrate de que la ruta sea correcta
import { cardsArtista } from '../cardsArtista/cardsArtista.js'; // Reutilizamos la función cardsArtista
import "./genreProfile.css"; // Asegúrate de que este CSS esté enlazado

/**
 * Renderiza el perfil completo de un género musical, incluyendo su historia y artistas asociados.
 * @param {string} generoId - El ID del género a mostrar.
 * @param {HTMLElement} contenedorPrincipal - El elemento DOM donde se renderizará todo el perfil.
 */
export const genreProfile = async (generoId, contenedorPrincipal) => {
    if (!generoId || !contenedorPrincipal) {
        console.error("Error: Se requiere un ID de género y un contenedor principal.");
        return;
    }

    // Limpiar el contenedor principal antes de renderizar el nuevo perfil
    contenedorPrincipal.innerHTML = '';
    contenedorPrincipal.classList.add("genre_profile_container"); // Clase para el contenedor principal

    // Contenedores para las diferentes secciones
    const genreHeaderSection = document.createElement("section");
    genreHeaderSection.classList.add("genre_header_section");

    const genreHistorySection = document.createElement("section");
    genreHistorySection.classList.add("genre_history_section");

    const artistsSection = document.createElement("section");
    artistsSection.classList.add("genre_artists_section"); // Sección para los artistas

    // Añadir los contenedores de sección al contenedor principal
    contenedorPrincipal.appendChild(genreHeaderSection);
    contenedorPrincipal.appendChild(genreHistorySection);
    contenedorPrincipal.appendChild(artistsSection);

    // --- 1. Obtener datos del género y sus artistas ---
    try {
        const token = localStorage.getItem("accessToken"); // Asumiendo que necesitas token
        const headers = { "Content-Type": "application/json" };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        // Fetch para el género y para los artistas de ese género
        const [genreResponse, artistsResponse] = await Promise.all([
            fetch(`http://localhost:3000/generosMusicales/${generoId}`, { headers }),
            fetch(`http://localhost:3000/artistas/genero/${generoId}`, { headers }) // Asumiendo este endpoint
        ]);

        const genreData = await genreResponse.json();
        const artistsData = await artistsResponse.json();

        if (!genreResponse.ok || genreData.error) {
            console.error("Error al obtener datos del género:", genreData.message || genreResponse.statusText);
            const errorMessage = document.createElement('p');
            errorMessage.classList.add("error-message");
            errorMessage.textContent = "No se pudo cargar la información del género.";
            contenedorPrincipal.appendChild(errorMessage);
            return;
        }

        // --- 2. Renderizar el encabezado del perfil del género ---
        const genero = genreData;
        
        const headerContent = document.createElement("div");
        headerContent.classList.add("genre_header_content");

        const genreImage = document.createElement("img");
        genreImage.classList.add("genre_profile_image");
        // *** CAMBIO AQUÍ: Usamos un placeholder ya que la tabla no tiene campo de imagen ***
        genreImage.src = `https://placehold.co/180x180/2ED162/FFFFFF?text=${genero.nombre_genero.substring(0, 3).toUpperCase()}`; // Placeholder con las iniciales del género
        genreImage.alt = genero.nombre_genero;

        const genreInfo = document.createElement("div");
        genreInfo.classList.add("genre_info");

        const genreType = document.createElement("p");
        genreType.classList.add("genre_type");
        genreType.textContent = "Género Musical";

        const genreName = document.createElement("h1");
        genreName.classList.add("genre_name");
        genreName.textContent = genero.nombre_genero;

        headerContent.appendChild(genreImage);
        headerContent.appendChild(genreInfo);
        genreInfo.appendChild(genreType);
        genreInfo.appendChild(genreName);
        genreHeaderSection.appendChild(headerContent);

        // --- 3. Renderizar la sección de historia ---
        const historyTitle = document.createElement("h2");
        historyTitle.classList.add("history_title");
        historyTitle.textContent = `Historia del ${genero.nombre_genero}`;

        const historyParagraph = document.createElement("p");
        historyParagraph.classList.add("history_paragraph");
        
        const fullDescription = genero.descripcion || "Historia no disponible.";
        const shortDescriptionLength = 300; // Define la longitud del snippet
        const isLongDescription = fullDescription.length > shortDescriptionLength;

        historyParagraph.textContent = isLongDescription 
            ? fullDescription.slice(0, shortDescriptionLength) + '...' 
            : fullDescription;

        genreHistorySection.appendChild(historyTitle);
        genreHistorySection.appendChild(historyParagraph);

        if (isLongDescription) {
            const readMoreButton = document.createElement("button");
            readMoreButton.classList.add("read_more_button");
            readMoreButton.textContent = "Ver más";
            genreHistorySection.appendChild(readMoreButton);

            readMoreButton.addEventListener("click", () => {
                if (historyParagraph.textContent.endsWith('...')) {
                    historyParagraph.textContent = fullDescription;
                    readMoreButton.textContent = "Ver menos";
                } else {
                    historyParagraph.textContent = fullDescription.slice(0, shortDescriptionLength) + '...';
                    readMoreButton.textContent = "Ver más";
                }
            });
        }

        // --- 4. Renderizar la sección de artistas ---
        const artistsTitleContainer = document.createElement("div");
        artistsTitleContainer.classList.add("content_titulos"); // Reutilizamos clase de títulos
        const artistsTitle = document.createElement('h3');
        artistsTitle.textContent = `Artistas de ${genero.nombre_genero}`;
        const artistsVerMas = document.createElement('a');
        artistsVerMas.href = `#/artistas/genero/${generoId}`; // Enlace para ver todos los artistas del género
        artistsVerMas.classList.add("ver-mas");
        artistsVerMas.textContent = "Ver más";
        artistsTitleContainer.appendChild(artistsTitle);
        artistsTitleContainer.appendChild(artistsVerMas);

        const artistsCardsContainer = document.createElement("div");
        artistsCardsContainer.classList.add("content_cards"); // Reutilizamos clase de content_cards

        artistsSection.appendChild(artistsTitleContainer);
        artistsSection.appendChild(artistsCardsContainer);

        if (artistsData.data && artistsData.data.length > 0) {
            // Usamos contentCards para renderizar los artistas, sin límite para mostrar todos
            contentCards(artistsData.data, artistsCardsContainer, cardsArtista, artistsData.data.length);
        } else {
            const noArtistsMessage = document.createElement('p');
            noArtistsMessage.classList.add("no-content-message");
            noArtistsMessage.textContent = `No hay artistas disponibles para el género ${genero.nombre_genero}.`;
            artistsCardsContainer.appendChild(noArtistsMessage);
        }

    } catch (error) {
        console.error("Error al cargar el perfil del género:", error);
        const errorMessage = document.createElement('p');
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Ocurrió un error al cargar el perfil del género.";
        contenedorPrincipal.appendChild(errorMessage);
    }
};