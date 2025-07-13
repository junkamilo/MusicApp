import { estaAutenticado } from "../../helpers/auth.js";
import "./userUploadedSongs.css";
import { error, success } from "../../helpers/alerts.js";
import { cardCancion } from "../cardCancion/cardCancion.js";

/**
 * Renders the user's uploaded songs page.
 * @param {HTMLElement} appContainer - The main container element where the page content will be rendered.
 */
export const userUploadedSongs = async (appContainer) => {
    if (!appContainer) {
        console.error("Error: Contenedor de la aplicación no encontrado.");
        return;
    }

    appContainer.innerHTML = '';
    appContainer.classList.add("user_uploads_page");

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const token = localStorage.getItem("accessToken");

    if (!userId || !token) {
        console.warn("Usuario no autenticado o ID/Token no encontrado. Redirigiendo a login.");
        window.location.hash = "#Login";
        return;
    }

    // --- Encabezado ---
    const pageHeader = document.createElement("div");
    pageHeader.classList.add("page_header");

    const pageTitle = document.createElement("h2");
    pageTitle.classList.add("page_title");
    pageTitle.textContent = "Mis Canciones Subidas";
    pageHeader.appendChild(pageTitle);

    const backButton = document.createElement("button");
    backButton.classList.add("back_button");
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Volver';
    backButton.addEventListener("click", () => {
        window.history.back();
    });
    pageHeader.appendChild(backButton);

    appContainer.appendChild(pageHeader);

    const songsGridContainer = document.createElement("div");
    songsGridContainer.classList.add("content_cards", "user_songs_grid");
    appContainer.appendChild(songsGridContainer);

    const fetchUserSongs = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/canciones-usuario/${userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al cargar las canciones.");
            }

            const result = await response.json();
            return result.data;

        } catch (err) {
            console.error("Error fetching user songs:", err);
            error({ message: err.message || "No se pudieron cargar tus canciones." });
            return [];
        }
    };

    const deleteSong = async (songId, songTitle) => {
        const result = await confirmAction({
            message: `¿Estás seguro de que quieres eliminar "${songTitle}"? Esta acción no se puede deshacer.`,
            confirmText: "Sí, eliminar",
            cancelText: "Cancelar"
        });

        if (!result) return;

        try {
            const response = await fetch(`http://localhost:3000/api/canciones-usuario/${songId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al eliminar la canción.");
            }

            success({ message: `"${songTitle}" eliminada exitosamente.` });
            renderSongs();

        } catch (err) {
            console.error("Error deleting song:", err);
            error({ message: err.message || "No se pudo eliminar la canción." });
        }
    };

    const renderSongs = async () => {
        songsGridContainer.innerHTML = '';
        const userSongsData = await fetchUserSongs();

        if (userSongsData.length === 0) {
            const noSongsMessage = document.createElement("p");
            noSongsMessage.classList.add("no_songs_message");
            noSongsMessage.textContent = "Aún no has subido ninguna canción. ¡Sube tu primera canción ahora!";
            songsGridContainer.appendChild(noSongsMessage);
            return;
        }

        // ✅ Adaptamos los datos para que cardCancion los entienda
        const adaptedSongs = userSongsData.map((song) => ({
            id_cancion: song.id_cancion_usuario,
            titulo_cancion: song.titulo,
            duracion: song.duracion,
            url_archivo_audio: song.url_archivo_audio,
            artista: "Tú",
            portada: "/assets/imgs/uploaded-default.png" // Imagen por defecto si no tienes carátula
        }));

        cardCancion(
            adaptedSongs,
            songsGridContainer,
            false,
            true,
            (title, artist, cover, audioUrl) => {
                if (window.updateFooterPlayer) {
                    const host = window.location.hostname;
                    const fullAudioUrl = `http://${host}:3000/uploads${encodeURI(audioUrl)}`;
                    window.updateFooterPlayer(title, artist, cover, fullAudioUrl);
                }
            },
            deleteSong
        );
    };

    renderSongs();
};
