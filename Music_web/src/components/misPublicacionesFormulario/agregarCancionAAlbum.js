// components/addSongToAlbum/addSongToAlbum.js

import { success, error, confirmAction } from "../../helpers/alerts";
import { getTokenData } from "../../helpers/auth";
import "./agregarCancionAAlbum.css"; // CSS para el modal y el formulario

/**
 * Componente para agregar canciones a un álbum específico, mostrado como una ventana modal.
 */
export const agregarCancionAAlbum = async () => {
    const appContainer = document.getElementById("app");

    // Obtener albumId desde location.hash (ej: "#/agregarCancion/123")
    const hash = location.hash.slice(1); // Quita el #
    const partes = hash.split('/');
    const albumId = partes[2];

    const token = localStorage.getItem("accessToken");
    const { userId: artistaId } = getTokenData();

    if (!albumId || !token || !artistaId) {
        error({ message: "No se puede añadir canciones. Información de sesión o álbum incompleta." });
        window.location.hash = "#MisPublicaciones";
        return;
    }

    // --- Crear el overlay del modal ---
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");
    appContainer.appendChild(modalOverlay);

    // --- Crear el contenido del modal ---
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalOverlay.appendChild(modalContent);

    const closeButton = document.createElement("button");
    closeButton.classList.add("modal-close-btn");
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    modalContent.appendChild(closeButton);

    closeButton.addEventListener("click", () => {
        modalOverlay.remove();
        window.location.hash = "#MisPublicaciones";
    });

    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
            window.location.hash = "#MisPublicaciones";
        }
    });

    const sectionHeader = document.createElement("div");
    sectionHeader.classList.add("modal-header");
    sectionHeader.innerHTML = `
        <h2 class="modal-title">Añadir Canciones al Álbum</h2>
        <p class="modal-subtitle">Álbum ID: <strong>${albumId}</strong></p>
    `;
    modalContent.appendChild(sectionHeader);

    const cancionesContainer = document.createElement("div");
    cancionesContainer.className = "canciones_container";
    modalContent.appendChild(cancionesContainer);

    const createSongInputGroup = () => {
        const idSuffix = Date.now();
        const songGroup = document.createElement("div");
        songGroup.className = "song_group";

        songGroup.innerHTML = `
            <div class="input_wrapper">
                <label for="titulo_cancion_${idSuffix}" class="form_label">Título de la Canción</label>
                <input type="text" id="titulo_cancion_${idSuffix}" name="titulo_cancion" placeholder="Título de la canción" required />
            </div>
            <div class="input_wrapper">
                <label for="duracion_${idSuffix}" class="form_label">Duración</label>
                <input type="text" id="duracion_${idSuffix}" name="duracion" placeholder="Duración (ej. 03:45)" required />
            </div>
            <div class="input_wrapper">
                <label for="numero_pista_${idSuffix}" class="form_label">Número de Pista</label>
                <input type="number" id="numero_pista_${idSuffix}" name="numero_pista" placeholder="Número de pista" required />
            </div>
            <div class="input_wrapper">
                <label for="descripcion_${idSuffix}" class="form_label">Descripción</label>
                <textarea id="descripcion_${idSuffix}" name="descripcion" placeholder="Descripción (opcional)"></textarea>
            </div>
            <div class="input_wrapper file-input-wrapper">
                <label for="audio_file_${idSuffix}" class="form_label">Archivo de Audio (MP3)</label>
                <input type="file" id="audio_file_${idSuffix}" name="audio" accept="audio/mp3" required />
                <span class="file-name-display">Ningún archivo seleccionado</span>
            </div>
            <button type="button" class="remove-song-btn"><i class="fas fa-trash-alt"></i> Eliminar</button>
        `;

        const fileInput = songGroup.querySelector('input[name="audio"]');
        const fileNameDisplay = songGroup.querySelector('.file-name-display');
        fileInput.addEventListener('change', (e) => {
            fileNameDisplay.textContent = e.target.files.length > 0
                ? e.target.files[0].name
                : 'Ningún archivo seleccionado';
        });

        const removeButton = songGroup.querySelector(".remove-song-btn");
        removeButton.addEventListener("click", () => {
            confirmAction({
                message: "¿Estás seguro de que quieres eliminar esta canción del formulario?",
                confirmText: "Sí, Eliminar",
                cancelText: "Cancelar"
            }).then(confirmed => {
                if (confirmed) {
                    songGroup.remove();
                    if (cancionesContainer.children.length === 0) {
                        addSongBtn.click();
                    }
                }
            });
        });

        return songGroup;
    };

    const addSongBtn = document.createElement("button");
    addSongBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Añadir otra canción';
    addSongBtn.classList.add("action_button", "add-another-song-btn");
    addSongBtn.addEventListener("click", () => {
        cancionesContainer.appendChild(createSongInputGroup());
    });

    modalContent.appendChild(addSongBtn);
    addSongBtn.click(); // Añadir la primera canción por defecto

    const formActions = document.createElement("div");
    formActions.classList.add("form-actions");
    modalContent.appendChild(formActions);

    const finalizarBtn = document.createElement("button");
    finalizarBtn.innerHTML = '<i class="fas fa-upload"></i> Subir canciones';
    finalizarBtn.classList.add("action_button", "submit-songs-btn");
    formActions.appendChild(finalizarBtn);

    finalizarBtn.addEventListener("click", async () => {
        const songGroups = cancionesContainer.querySelectorAll(".song_group");
        if (songGroups.length === 0) {
            error({ message: "Agrega al menos una canción antes de subir." });
            return;
        }

        try {
            for (const group of songGroups) {
                const titulo = group.querySelector('input[name="titulo_cancion"]').value.trim();
                const duracion = group.querySelector('input[name="duracion"]').value.trim();
                const numero = group.querySelector('input[name="numero_pista"]').value.trim();
                const descripcion = group.querySelector('textarea[name="descripcion"]').value.trim();
                const audio = group.querySelector('input[name="audio"]').files[0];

                if (!titulo || !duracion || !numero || !audio) {
                    throw new Error("Todos los campos de cada canción son obligatorios (excepto la descripción).");
                }

                const formData = new FormData();
                formData.append("file", audio);
                formData.append("titulo", titulo);
                formData.append("duracion", duracion);
                formData.append("numero_pista", numero);
                formData.append("descripcion", descripcion);
                formData.append("album_id", albumId);
                formData.append("artista_id", artistaId);

                const res = await fetch("http://localhost:3000/upload-audio/cancion/audio", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formData
                });

                const data = await res.json();

                if (!res.ok || data.error) {
                    throw new Error(`Error al subir la canción "${titulo}": ${data.message || "Error desconocido"}`);
                }
            }

            success({ message: "Canciones añadidas correctamente al álbum." });
            modalOverlay.remove();
            window.location.hash = "#MisPublicaciones";
        } catch (err) {
            console.error("Error al subir canciones:", err.message);
            error({ message: err.message });
        }
    });

    const volverBtn = document.createElement("button");
    volverBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Volver sin subir canciones';
    volverBtn.classList.add("action_button", "cancel-btn");
    volverBtn.addEventListener("click", () => {
        modalOverlay.remove();
        window.location.hash = "#MisPublicaciones";
    });

    formActions.appendChild(volverBtn);
};
