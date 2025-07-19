// components/misPublicaciones/misPublicaciones.js

import { eliminarAlbumAPI, eliminarCancionAPI, obtenerMisPublicaciones } from "../../helpers/obtenerMisPublicaciones";
import { confirmAction, success, error } from "../../helpers/alerts";
import "./misPublicaciones.css";

// Variables globales para controlar el estado de reproducción
let currentPlayingAudioElement = null; // Referencia al elemento <audio> global (del footer)
let currentPlayingPlayButton = null;  // Referencia al botón de play/pause de la canción actualmente reproduciéndose

/**
 * Componente que renderiza las publicaciones de un artista.
 * @param {HTMLElement} contenedor - Elemento contenedor donde se insertarán los álbumes.
 */
export const renderMisPublicaciones = async (contenedor) => {
    if (!contenedor) return console.error("Contenedor no encontrado.");

    contenedor.innerHTML = `<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Cargando tus publicaciones...</div>`;
    contenedor.classList.add("mis-publicaciones-container"); // Asegura que la clase principal esté siempre

    const publicaciones = await obtenerMisPublicaciones();
    contenedor.innerHTML = ""; // Limpiar el mensaje de carga

    if (!Array.isArray(publicaciones) || publicaciones.length === 0) {
        contenedor.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <p>Aún no tienes álbumes publicados.</p>
                <button class="action_button create-first-album-btn">
                    <i class="fas fa-plus-circle"></i> Crear mi primer álbum
                </button>
            </div>
        `;
        contenedor.querySelector(".create-first-album-btn").addEventListener("click", () => {
            window.location.hash = "#CrearAlbum";
        });
        return;
    }

    const sectionTitle = document.createElement("h2");
    sectionTitle.className = "section-title";
    sectionTitle.innerHTML = '<i class="fas fa-compact-disc"></i> Mis Álbumes Publicados';
    contenedor.appendChild(sectionTitle);

    const albumsGrid = document.createElement("div");
    albumsGrid.className = "albums-grid";
    contenedor.appendChild(albumsGrid);

    // Obtener el reproductor global del footer (asumiendo que existe en el DOM principal)
    const globalAudioPlayer = document.getElementById("audioPlayer");
    const footerPlayer = document.getElementById("footerPlayer");
    const playerCover = document.getElementById("playerCover");
    const playerTitle = document.getElementById("playerTitle");
    const playerArtist = document.getElementById("playerArtist");
    const host = window.location.hostname;

    // Listener para el reproductor global para resetear el botón de play/pause
    // cuando la canción termina o es pausada desde los controles del navegador/footer
    if (globalAudioPlayer) {
        globalAudioPlayer.onended = () => {
            if (currentPlayingPlayButton) {
                currentPlayingPlayButton.querySelector(".play-icon").classList.remove("hidden");
                currentPlayingPlayButton.querySelector(".pause-icon").classList.add("hidden");
            }
            currentPlayingAudioElement = null;
            currentPlayingPlayButton = null;
        };

        globalAudioPlayer.onpause = () => {
            // Solo actualiza si el evento de pausa viene de la canción que estamos siguiendo
            if (currentPlayingAudioElement === globalAudioPlayer && currentPlayingPlayButton) {
                currentPlayingPlayButton.querySelector(".play-icon").classList.remove("hidden");
                currentPlayingPlayButton.querySelector(".pause-icon").classList.add("hidden");
                currentPlayingAudioElement = null;
                currentPlayingPlayButton = null;
            }
        };

        globalAudioPlayer.onplay = () => {
            // Asegura que el botón de la canción actualmente reproduciéndose muestre pausa
            // y que cualquier otro botón de play/pause muestre play
            if (currentPlayingPlayButton && currentPlayingAudioElement !== globalAudioPlayer) {
                currentPlayingPlayButton.querySelector(".play-icon").classList.remove("hidden");
                currentPlayingPlayButton.querySelector(".pause-icon").classList.add("hidden");
            }
            // El botón de la canción que acaba de empezar a sonar ya se actualiza en el click handler
            // No necesitamos hacer nada aquí si ya lo manejamos en el click.
        };
    }


    publicaciones.forEach((album) => {
        const albumCard = document.createElement("div");
        albumCard.className = "album-card";
        albumCard.dataset.albumId = album.album_id;

        const albumHeaderClickable = document.createElement("div");
        albumHeaderClickable.className = "album-header-clickable";

        const portada = document.createElement("img");
        portada.src = album.url_portada_album || "./assets/default_album_cover.png";
        portada.alt = `Portada de ${album.titulo_album}`;
        portada.className = "portada";

        const info = document.createElement("div");
        info.className = "album-info";
        info.innerHTML = `
            <h3>${album.titulo_album}</h3>
            <p class="album-description">${album.descripcion_album || "Sin descripción."}</p>
            <p class="album-date">Lanzamiento: <strong>${album.fecha_album}</strong></p>
        `;

        const toggleSongsBtn = document.createElement("button");
        toggleSongsBtn.className = "toggle-songs-btn";
        toggleSongsBtn.innerHTML = '<i class="fas fa-chevron-down toggle-icon"></i>';

        albumHeaderClickable.append(portada, info, toggleSongsBtn);
        albumCard.appendChild(albumHeaderClickable);

        const albumActionsContainer = document.createElement("div");
        albumActionsContainer.className = "album-actions-container";

        const btnEliminarAlbum = document.createElement("button");
        btnEliminarAlbum.className = "action_button delete-album-btn";
        btnEliminarAlbum.innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar Álbum';
        btnEliminarAlbum.addEventListener("click", async (e) => {
            e.stopPropagation();
            const confirmation = await confirmAction({
                message: `¿Eliminar el álbum "${album.titulo_album}"? Esta acción eliminará todas sus canciones.`,
                confirmText: "Sí, Eliminar Álbum",
                cancelText: "Cancelar"
            });
            if (confirmation) {
                await eliminarAlbumAPI(album.album_id, album.titulo_album, () => {
                    success({ message: `Álbum "${album.titulo_album}" eliminado.` });
                    renderMisPublicaciones(contenedor);
                });
            }
        });
        albumActionsContainer.appendChild(btnEliminarAlbum);

        const btnAddSongToAlbum = document.createElement("button");
        btnAddSongToAlbum.className = "action_button add-song-to-album-btn";
        btnAddSongToAlbum.innerHTML = '<i class="fas fa-plus-circle"></i> Añadir Canción';
        btnAddSongToAlbum.addEventListener("click", (e) => {
            e.stopPropagation();
            window.location.hash = `#/agregarCancion/${album.album_id}`;
        });
        albumActionsContainer.appendChild(btnAddSongToAlbum);
        albumCard.appendChild(albumActionsContainer);

        const songsCollapsibleContent = document.createElement("div");
        songsCollapsibleContent.className = "songs-collapsible-content";

        const listaCanciones = document.createElement("ul");
        listaCanciones.className = "lista-canciones";

        if (!album.canciones || album.canciones.length === 0) {
            listaCanciones.innerHTML = '<li class="no-songs-message">No hay canciones en este álbum.</li>';
        } else {
            album.canciones.forEach((cancion) => {
                const li = document.createElement("li");
                li.className = "cancion-item";
                li.dataset.cancionId = cancion.cancion_id;

                li.innerHTML = `
                    <div class="song-details">
                        <span class="song-track">#${cancion.numero_pista || '-'}</span>
                        <span class="song-title">${cancion.titulo_cancion}</span>
                        <button class="play-pause-btn" data-song-id="${cancion.cancion_id}">
                            <i class="fas fa-play play-icon"></i>
                            <i class="fas fa-pause pause-icon hidden"></i>
                        </button>
                        <span class="song-duration">${cancion.duracion || '00:00'}</span>
                    </div>
                    <div class="song-controls">
                        <!-- El elemento audio real para reproducción global se maneja en el footer -->
                        <button class="action_button btn-eliminar-cancion">
                            <i class="fas fa-trash-alt"></i> Eliminar
                        </button>
                    </div>
                `;

                // 🎵 Lógica del botón de Reproducir/Pausar
                const playPauseBtn = li.querySelector(".play-pause-btn");
                playPauseBtn.addEventListener("click", (e) => {
                    e.stopPropagation(); // Evita que el click en el botón active el click del li si tuviera

                    const audioURL = `http://${host}:3000/uploads/${encodeURI(cancion.url_archivo_audio)}`;

                    // Si no hay reproductor global, o si la URL de la canción es inválida
                    if (!globalAudioPlayer || !cancion.url_archivo_audio) {
                        error({ message: "No se puede reproducir la canción. Archivo no disponible o reproductor no encontrado." });
                        return;
                    }

                    // Si la canción que se intenta reproducir es la misma que ya está sonando
                    if (globalAudioPlayer.src === audioURL) {
                        if (globalAudioPlayer.paused) {
                            globalAudioPlayer.play();
                            playPauseBtn.querySelector(".play-icon").classList.add("hidden");
                            playPauseBtn.querySelector(".pause-icon").classList.remove("hidden");
                        } else {
                            globalAudioPlayer.pause();
                            playPauseBtn.querySelector(".play-icon").classList.remove("hidden");
                            playPauseBtn.querySelector(".pause-icon").classList.add("hidden");
                        }
                    } else {
                        // Si es una nueva canción, pausar la anterior (si hay) y reproducir esta
                        if (currentPlayingAudioElement && currentPlayingAudioElement.src !== audioURL) {
                            currentPlayingAudioElement.pause();
                            if (currentPlayingPlayButton) {
                                currentPlayingPlayButton.querySelector(".play-icon").classList.remove("hidden");
                                currentPlayingPlayButton.querySelector(".pause-icon").classList.add("hidden");
                            }
                        }

                        globalAudioPlayer.src = audioURL;
                        globalAudioPlayer.play();

                        // Actualizar UI del footer
                        if (footerPlayer) footerPlayer.classList.remove("hidden");
                        if (playerCover) playerCover.src = album.url_portada_album || "./assets/default_album_cover.png";
                        if (playerTitle) playerTitle.textContent = cancion.titulo_cancion;
                        if (playerArtist) playerArtist.textContent = album.nombre_artista || "Artista Desconocido";

                        // Actualizar estado del botón actual
                        playPauseBtn.querySelector(".play-icon").classList.add("hidden");
                        playPauseBtn.querySelector(".pause-icon").classList.remove("hidden");

                        // Guardar referencias a la canción y botón actuales
                        currentPlayingAudioElement = globalAudioPlayer;
                        currentPlayingPlayButton = playPauseBtn;
                    }
                });

                // Actualizar el estado inicial del botón si esta canción ya está sonando
                if (globalAudioPlayer && globalAudioPlayer.src.includes(encodeURI(cancion.url_archivo_audio)) && !globalAudioPlayer.paused) {
                    playPauseBtn.querySelector(".play-icon").classList.add("hidden");
                    playPauseBtn.querySelector(".pause-icon").classList.remove("hidden");
                    currentPlayingPlayButton = playPauseBtn;
                    currentPlayingAudioElement = globalAudioPlayer;
                }


                const btnEliminarCancion = li.querySelector(".btn-eliminar-cancion");
                btnEliminarCancion.addEventListener("click", async (e) => {
                    e.stopPropagation();
                    const confirmation = await confirmAction({
                        message: `¿Eliminar la canción "${cancion.titulo_cancion}"?`,
                        confirmText: "Sí, Eliminar Canción",
                        cancelText: "Cancelar"
                    });
                    if (confirmation) {
                        await eliminarCancionAPI(cancion.cancion_id, cancion.titulo_cancion, () => {
                            success({ message: `Canción "${cancion.titulo_cancion}" eliminada.` });
                            renderMisPublicaciones(contenedor);
                        });
                    }
                });

                listaCanciones.appendChild(li);
            });
        }

        songsCollapsibleContent.appendChild(listaCanciones);
        albumCard.appendChild(songsCollapsibleContent);
        albumsGrid.appendChild(albumCard);

        // Lógica de expandir/contraer
        albumHeaderClickable.addEventListener("click", () => { // El clic para expandir es en todo el header
            songsCollapsibleContent.classList.toggle("expanded");
            toggleSongsBtn.classList.toggle("rotated");
        });
    });
};
