import { error, success } from "../../helpers/alerts";
import { estaAutenticado } from "../../helpers/auth";
import "./createAlbum.css";

/**
 * Renders an interactive form for artists to create a new album and upload multiple songs.
 * @param {HTMLElement} appContainer - The main container element where the form will be rendered.
 */
export const createAlbum = async (appContainer) => {
    if (!appContainer) {
        console.error("Error: Contenedor de la aplicación no encontrado para el formulario de álbum.");
        return;
    }

    appContainer.innerHTML = ''; // Limpiar el contenido previo
    appContainer.classList.add("create_album_page"); // Clase principal para la página

    if (!estaAutenticado()) {
        console.warn("Usuario no autenticado. Redirigiendo a login.");
        window.location.hash = "#Login";
        return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id; // Este es el id_usuario
    const token = localStorage.getItem("accessToken");

    if (!userId || !token) {
        console.warn("ID de usuario o Token no encontrado. Redirigiendo a login.");
        window.location.hash = "#Login";
        return;
    }

    let artistaId = null; // Para almacenar el artista_id del usuario logueado

    // --- Función para obtener el artista_id del usuario logueado ---
    const fetchArtistId = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/artistas/user/${userId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "No se pudo verificar el perfil de artista.");
            }
            const artistData = await response.json();
            if (artistData && artistData.artista_id) {
                artistaId = artistData.artista_id;
            } else {
                throw new Error("No estás registrado como artista.");
            }
        } catch (err) {
            console.error("Error al obtener artista_id:", err);
            error({ message: err.message || "Debes ser un artista para crear un álbum." });
            window.location.hash = "#ConvertirseEnArtista"; // Redirigir si no es artista
            return null;
        }
        return artistaId;
    };

    // Esperar a obtener el artista_id antes de renderizar el formulario
    artistaId = await fetchArtistId();
    if (!artistaId) return; // Salir si no se pudo obtener el artista_id

    // --- Título y Subtítulo ---
    const pageHeader = document.createElement("div");
    pageHeader.classList.add("album_form_header");
    pageHeader.innerHTML = `
        <h1 class="album_form_title">Crea Tu Nuevo Álbum</h1>
        <p class="album_form_subtitle">Da vida a tu próxima obra maestra. Sube los detalles y tus canciones.</p>
    `;
    appContainer.appendChild(pageHeader);

    // --- Formulario Principal ---
    const form = document.createElement("form");
    form.classList.add("create_album_form");
    form.noValidate = true;
    form.enctype = "multipart/form-data"; // Importante para la subida de archivos

    let selectedCoverFile = null; // Para almacenar el archivo de la portada
    let songsData = []; // Array para almacenar los datos de cada canción

    // --- Sección: Detalles del Álbum ---
    const albumDetailsSection = document.createElement("section");
    albumDetailsSection.classList.add("form_section", "album_details_section");
    albumDetailsSection.innerHTML = `<h3>Detalles del Álbum</h3>`;
    form.appendChild(albumDetailsSection);

    // Campo: Título del Álbum
    albumDetailsSection.appendChild(createInputGroup("text", "albumTitle", "Título del Álbum", "fa-solid fa-compact-disc", true));

    // Campo: Fecha del Álbum
    albumDetailsSection.appendChild(createInputGroup("date", "albumDate", "Fecha de Lanzamiento", "fa-solid fa-calendar-alt", true));

    // Campo: Descripción del Álbum
    const albumDescriptionGroup = document.createElement("div");
    albumDescriptionGroup.classList.add("form_group");
    const albumDescriptionLabel = document.createElement("label");
    albumDescriptionLabel.htmlFor = "albumDescription";
    albumDescriptionLabel.textContent = "Descripción del Álbum";
    albumDescriptionLabel.classList.add("form_label");
    const albumDescriptionTextarea = document.createElement("textarea");
    albumDescriptionTextarea.id = "albumDescription";
    albumDescriptionTextarea.name = "descripcion";
    albumDescriptionTextarea.classList.add("form_textarea");
    albumDescriptionTextarea.placeholder = "Una breve descripción de tu álbum, su concepto, etc.";
    albumDescriptionTextarea.rows = 4;
    albumDescriptionGroup.appendChild(albumDescriptionLabel);
    albumDescriptionGroup.appendChild(albumDescriptionTextarea);
    albumDetailsSection.appendChild(albumDescriptionGroup);

    // Campo: Portada del Álbum (Drag & Drop)
    const coverPhotoGroup = document.createElement("div");
    coverPhotoGroup.classList.add("form_group", "file_upload_group");

    const coverDropArea = document.createElement("div");
    coverDropArea.classList.add("drop_area", "cover_drop_area");
    coverDropArea.innerHTML = `
        <i class="fas fa-image upload_icon"></i>
        <p class="drop_text">Arrastra la portada del álbum aquí o <span class="browse_link">haz clic para seleccionar</span></p>
        <div class="file_preview_container">
            <img id="coverPreview" class="photo_preview hidden" src="" alt="Vista previa de la portada">
            <button type="button" id="clearCoverBtn" class="clear_photo_btn hidden"><i class="fas fa-times"></i></button>
        </div>
    `;

    const coverInput = document.createElement("input");
    coverInput.type = "file";
    coverInput.id = "albumCover";
    coverInput.name = "albumCover"; // Nombre para el FormData
    coverInput.accept = "image/*";
    coverInput.classList.add("hidden_file_input");

    coverPhotoGroup.appendChild(coverDropArea);
    coverPhotoGroup.appendChild(coverInput);
    albumDetailsSection.appendChild(coverPhotoGroup);

    const coverPreview = coverDropArea.querySelector("#coverPreview");
    const clearCoverBtn = coverDropArea.querySelector("#clearCoverBtn");
    const coverDropText = coverDropArea.querySelector(".drop_text");
    const coverUploadIcon = coverDropArea.querySelector(".upload_icon");

    // Helper para actualizar la vista previa de la portada
    const updateCoverPreview = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                coverPreview.src = e.target.result;
                coverPreview.classList.remove("hidden");
                clearCoverBtn.classList.remove("hidden");
                coverDropText.classList.add("hidden");
                coverUploadIcon.classList.add("hidden");
                coverDropArea.classList.add("has_file");
            };
            reader.readAsDataURL(file);
        } else {
            coverPreview.src = "";
            coverPreview.classList.add("hidden");
            clearCoverBtn.classList.add("hidden");
            coverDropText.classList.remove("hidden");
            coverUploadIcon.classList.remove("hidden");
            coverDropArea.classList.remove("has_file");
        }
    };

    // Event Listeners para Drag & Drop de la portada
    coverDropArea.addEventListener("click", () => coverInput.click());
    coverDropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        coverDropArea.classList.add("drag_over");
        coverDropText.textContent = "Suelta la imagen aquí...";
    });
    coverDropArea.addEventListener("dragleave", () => {
        coverDropArea.classList.remove("drag_over");
        coverDropText.textContent = "Arrastra la portada del álbum aquí o haz clic para seleccionar";
    });
    coverDropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        coverDropArea.classList.remove("drag_over");
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith("image/")) {
            selectedCoverFile = files[0];
            updateCoverPreview(selectedCoverFile);
        } else {
            selectedCoverFile = null;
            updateCoverPreview(null);
            error({ message: "Por favor, selecciona un archivo de imagen válido para la portada." });
        }
    });

    // Event Listener para la selección de archivo normal de la portada
    coverInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0 && e.target.files[0].type.startsWith("image/")) {
            selectedCoverFile = e.target.files[0];
            updateCoverPreview(selectedCoverFile);
        } else {
            selectedCoverFile = null;
            updateCoverPreview(null);
            error({ message: "Por favor, selecciona un archivo de imagen válido para la portada." });
        }
    });

    // Botón para limpiar la portada seleccionada
    clearCoverBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectedCoverFile = null;
        coverInput.value = "";
        updateCoverPreview(null);
    });

    // --- Sección: Canciones del Álbum ---
    const songsSection = document.createElement("section");
    songsSection.classList.add("form_section", "songs_section");
    songsSection.innerHTML = `<h3>Canciones <span class="song_count_display">(0)</span></h3>`;
    form.appendChild(songsSection);

    const songsContainer = document.createElement("div");
    songsContainer.classList.add("songs_list_container");
    songsSection.appendChild(songsContainer);

    const addSongButton = document.createElement("button");
    addSongButton.type = "button";
    addSongButton.classList.add("action_button", "add_song_button");
    addSongButton.innerHTML = '<i class="fas fa-plus-circle"></i> Añadir Canción';
    songsSection.appendChild(addSongButton);

    const songCountDisplay = songsSection.querySelector(".song_count_display");

    // Función para añadir un bloque de canción
    const addSongBlock = (initialData = {}) => {
        const songIndex = songsData.length;
        const songBlock = document.createElement("div");
        songBlock.classList.add("song_block");
        songBlock.dataset.songIndex = songIndex; // Para identificar la canción

        songBlock.innerHTML = `
            <div class="song_header">
                <h4>Canción #${songIndex + 1}</h4>
                <button type="button" class="remove_song_button"><i class="fas fa-times"></i></button>
            </div>
            <div class="form_group file_upload_group song_file_group">
                <div class="drop_area song_drop_area">
                    <i class="fas fa-file-audio upload_icon"></i>
                    <p class="drop_text">Arrastra el archivo MP3 aquí o <span class="browse_link">selecciona</span></p>
                    <p class="file_name_display"></p>
                </div>
                <input type="file" class="hidden_file_input song_file_input" accept="audio/mp3">
            </div>
            ${createInputGroupHTML("text", `songTitle_${songIndex}`, "Título de la Canción", "fa-solid fa-music", true)}
            ${createInputGroupHTML("text", `songDuration_${songIndex}`, "Duración (ej. 3:45)", "fa-solid fa-clock")}
            ${createInputGroupHTML("number", `trackNumber_${songIndex}`, "Número de Pista", "fa-solid fa-list-ol")}
            <div class="form_group">
                <label for="songDescription_${songIndex}" class="form_label">Descripción de la Canción</label>
                <textarea id="songDescription_${songIndex}" name="descripcion" class="form_textarea" placeholder="Breve descripción de la canción"></textarea>
            </div>
        `;
        songsContainer.appendChild(songBlock);

        // Inicializar datos para esta canción
        songsData.push({
            file: null,
            titulo_cancion: initialData.titulo_cancion || '',
            duracion: initialData.duracion || '',
            numero_pista: initialData.numero_pista || '',
            descripcion: initialData.descripcion || '',
            element: songBlock // Guardar referencia al elemento DOM
        });

        const currentSongData = songsData[songIndex];

        // Referencias a elementos dentro del nuevo bloque
        const songDropArea = songBlock.querySelector(".song_drop_area");
        const songFileInput = songBlock.querySelector(".song_file_input");
        const fileNameDisplay = songBlock.querySelector(".file_name_display");
        const removeSongButton = songBlock.querySelector(".remove_song_button");

        // Event Listeners para el archivo de la canción
        songDropArea.addEventListener("click", () => songFileInput.click());
        songDropArea.addEventListener("dragover", (e) => {
            e.preventDefault();
            songDropArea.classList.add("drag_over");
            songDropArea.querySelector(".drop_text").textContent = "Suelta el MP3 aquí...";
        });
        songDropArea.addEventListener("dragleave", () => {
            songDropArea.classList.remove("drag_over");
            songDropArea.querySelector(".drop_text").textContent = "Arrastra el archivo MP3 aquí o selecciona";
        });
        songDropArea.addEventListener("drop", (e) => {
            e.preventDefault();
            songDropArea.classList.remove("drag_over");
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type === "audio/mp3") {
                currentSongData.file = files[0];
                fileNameDisplay.textContent = `Archivo: ${currentSongData.file.name}`;
                songDropArea.querySelector(".drop_text").textContent = "MP3 Listo!";
                songDropArea.classList.add("has_file");
            } else {
                currentSongData.file = null;
                fileNameDisplay.textContent = "";
                songDropArea.querySelector(".drop_text").textContent = "Solo archivos MP3 son permitidos.";
                songDropArea.classList.remove("has_file");
                error({ message: "Por favor, selecciona un archivo MP3 válido." });
            }
        });
        songFileInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0 && e.target.files[0].type === "audio/mp3") {
                currentSongData.file = e.target.files[0];
                fileNameDisplay.textContent = `Archivo: ${currentSongData.file.name}`;
                songDropArea.querySelector(".drop_text").textContent = "MP3 Listo!";
                songDropArea.classList.add("has_file");
            } else {
                currentSongData.file = null;
                fileNameDisplay.textContent = "";
                songDropArea.querySelector(".drop_text").textContent = "Solo archivos MP3 son permitidos.";
                songDropArea.classList.remove("has_file");
                error({ message: "Por favor, selecciona un archivo MP3 válido." });
            }
        });

        // Eliminar canción
        removeSongButton.addEventListener("click", () => {
            const indexToRemove = parseInt(songBlock.dataset.songIndex);
            songsData.splice(indexToRemove, 1); // Eliminar del array de datos
            songBlock.remove(); // Eliminar del DOM
            updateSongIndexes(); // Reajustar índices y títulos
            updateSongCount();
        });

        updateSongCount();
    };

    // Helper para actualizar los índices de las canciones después de una eliminación
    const updateSongIndexes = () => {
        songsData.forEach((song, index) => {
            song.element.dataset.songIndex = index;
            song.element.querySelector(".song_header h4").textContent = `Canción #${index + 1}`;
            // Actualizar IDs de inputs si es necesario (no es crítico si se usan por index)
            song.element.querySelector(`#songTitle_${song.element.dataset.songIndex}`).id = `songTitle_${index}`;
            song.element.querySelector(`#songDuration_${song.element.dataset.songIndex}`).id = `songDuration_${index}`;
            song.element.querySelector(`#trackNumber_${song.element.dataset.songIndex}`).id = `trackNumber_${index}`;
            song.element.querySelector(`#songDescription_${song.element.dataset.songIndex}`).id = `songDescription_${index}`;
        });
    };

    // Helper para actualizar el contador de canciones
    const updateSongCount = () => {
        songCountDisplay.textContent = `(${songsData.length})`;
    };

    addSongButton.addEventListener("click", () => addSongBlock());

    // --- Botones de Acción ---
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("form_buttons_container");

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add("action_button", "submit_button");
    submitButton.innerHTML = '<i class="fa-solid fa-compact-disc"></i> Crear Álbum';
    buttonsContainer.appendChild(submitButton);

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.classList.add("action_button", "cancel_button");
    cancelButton.innerHTML = '<i class="fa-solid fa-times-circle"></i> Cancelar';
    cancelButton.addEventListener("click", () => {
        window.location.hash = "#Perfil"; // Redirigir al perfil del artista o a Home
    });
    buttonsContainer.appendChild(cancelButton);

    form.appendChild(buttonsContainer);
    appContainer.appendChild(form);

    // --- Función de Ayuda para crear un grupo de input HTML ---
    function createInputGroupHTML(type, id, placeholder, iconClass, required = false) {
        return `
            <div class="form_group">
                <div class="input_wrapper">
                    <i class="${iconClass}"></i>
                    <input type="${type}" id="${id}" name="${id}" class="form_input" placeholder="${placeholder}" autocomplete="off" ${required ? 'required' : ''}>
                </div>
            </div>
        `;
    }

    // --- Manejador de Envío del Formulario ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Recopilar datos del álbum
        const albumTitle = document.getElementById("albumTitle").value.trim();
        const albumDate = document.getElementById("albumDate").value; // YYYY-MM-DD
        const albumDescription = document.getElementById("albumDescription").value.trim();

        // Validación del lado del cliente para el álbum
        if (!albumTitle) {
            error({ message: "El título del álbum es obligatorio." });
            return;
        }
        if (!albumDate) {
            error({ message: "La fecha de lanzamiento del álbum es obligatoria." });
            return;
        }
        if (!selectedCoverFile) {
            error({ message: "La portada del álbum es obligatoria." });
            return;
        }

        // Recopilar datos de las canciones
        const songsToUpload = [];
        let allSongsValid = true;
        songsData.forEach((song, index) => {
            const songTitle = song.element.querySelector(`#songTitle_${index}`).value.trim();
            const songDuration = song.element.querySelector(`#songDuration_${index}`).value.trim();
            const trackNumber = song.element.querySelector(`#trackNumber_${index}`).value;
            const songDescription = song.element.querySelector(`#songDescription_${index}`).value.trim();

            if (!song.file) {
                error({ message: `La Canción #${index + 1} requiere un archivo MP3.` });
                allSongsValid = false;
                return;
            }
            if (!songTitle) {
                error({ message: `El título de la Canción #${index + 1} es obligatorio.` });
                allSongsValid = false;
                return;
            }
            // Puedes añadir más validaciones para duración, número de pista, etc.

            songsToUpload.push({
                file: song.file,
                titulo_cancion: songTitle,
                duracion: songDuration,
                numero_pista: trackNumber ? parseInt(trackNumber) : null,
                descripcion: songDescription,
                artista_id: artistaId // Cada canción también necesita el artista_id
            });
        });

        if (!allSongsValid) return;
        if (songsToUpload.length === 0) {
            error({ message: "Debes añadir al menos una canción al álbum." });
            return;
        }

        // Confirmación antes de enviar
        const confirmation = await confirmAction({
            message: `¿Estás seguro de que quieres crear el álbum "${albumTitle}" con ${songsToUpload.length} canciones?`,
            confirmText: "Sí, Crear Álbum",
            cancelText: "Cancelar"
        });
        if (!confirmation) return;

        try {
            // --- Paso 1: Crear el Álbum ---
            const albumFormData = new FormData();
            albumFormData.append("titulo_album", albumTitle);
            albumFormData.append("fecha_album", albumDate);
            albumFormData.append("descripcion", albumDescription);
            albumFormData.append("artista_id", artistaId);
            albumFormData.append("portadaAlbum", selectedCoverFile); // 'portadaAlbum' debe coincidir con el backend

            const albumResponse = await fetch("http://localhost:3000/api/albums", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: albumFormData,
            });

            const albumResult = await albumResponse.json();

            if (!albumResponse.ok || albumResult.error) {
                console.error("Error al crear el álbum:", albumResult.message || albumResponse.statusText);
                error({ message: albumResult.message || "Error al crear el álbum." });
                return;
            }

            const newAlbumId = albumResult.album_id; // Asume que el backend devuelve el ID del nuevo álbum
            success({ message: `Álbum "${albumTitle}" creado exitosamente. Subiendo canciones...` });


            const songsFormData = new FormData();
            songsFormData.append("album_id", newAlbumId);
            songsFormData.append("artista_id", artistaId);

            songsToUpload.forEach((song, index) => {
                songsFormData.append(`canciones[${index}][file]`, song.file);
                songsFormData.append(`canciones[${index}][titulo_cancion]`, song.titulo_cancion);
                songsFormData.append(`canciones[${index}][duracion]`, song.duracion);
                songsFormData.append(`canciones[${index}][numero_pista]`, song.numero_pista || '');
                songsFormData.append(`canciones[${index}][descripcion]`, song.descripcion);
            });

            const songsResponse = await fetch("http://localhost:3000/api/songs/upload-batch", { // Endpoint para subir múltiples canciones
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: songsFormData,
            });

            const songsResult = await songsResponse.json();

            if (!songsResponse.ok || songsResult.error) {
                console.error("Error al subir las canciones:", songsResult.message || songsResponse.statusText);
                error({ message: songsResult.message || "Álbum creado, pero error al subir las canciones." });
                return;
            }

            success({ message: `¡Álbum "${albumTitle}" y sus canciones subidas exitosamente!` });
            form.reset();
            selectedCoverFile = null;
            updateCoverPreview(null);
            songsData = [];
            songsContainer.innerHTML = '';
            updateSongCount();
            window.location.hash = "#/albumes"; // Redirigir a la página de álbumes o al perfil del artista

        } catch (err) {
            console.error("Error de conexión al intentar crear álbum o subir canciones:", err);
            error({ message: "Error de conexión al intentar crear álbum o subir canciones." });
        }
    });
};