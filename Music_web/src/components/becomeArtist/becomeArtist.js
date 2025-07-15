import { error, success } from "../../helpers/alerts";
import { estaAutenticado } from "../../helpers/auth";
import "./becomeArtist.css";

/**
 * Renders an interactive form for users to register as artists.
 * @param {HTMLElement} appContainer - The main container element where the form will be rendered.
 */
export const becomeArtist = async (appContainer) => {
    if (!appContainer) {
        console.error("Error: Contenedor de la aplicación no encontrado para el formulario de artista.");
        return;
    }

    // Limpiar el contenedor principal antes de renderizar el nuevo formulario
    appContainer.innerHTML = '';
    appContainer.classList.add("become_artist_page"); // Clase principal para la página

    if (!estaAutenticado()) {
        console.warn("Usuario no autenticado. Redirigiendo a login.");
        window.location.hash = "#Login";
        return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const token = localStorage.getItem("accessToken");

    if (!userId || !token) {
        console.warn("ID de usuario o Token no encontrado. Redirigiendo a login.");
        window.location.hash = "#Login";
        return;
    }

    // --- Título y Subtítulo ---
    const pageHeader = document.createElement("div");
    pageHeader.classList.add("artist_form_header");
    pageHeader.innerHTML = `
        <h1 class="artist_form_title">¡Conviértete en Artista!</h1>
        <p class="artist_form_subtitle">Comparte tu música con el mundo. Completa tu perfil de artista.</p>
    `;
    appContainer.appendChild(pageHeader);

    // --- Formulario Principal ---
    const form = document.createElement("form");
    form.classList.add("become_artist_form");
    form.noValidate = true;
    form.enctype = "multipart/form-data";

    let selectedPhotoFile = null; // Para almacenar el archivo de la foto
    let selectedGenres = new Set(); // Para almacenar los IDs de los géneros seleccionados

    // --- Campo: Nombre del Artista ---
    const artistNameGroup = createInputGroup("text", "artistName", "Tu Nombre Artístico", "fa-solid fa-microphone-alt", true);
    form.appendChild(artistNameGroup);

    // --- Campo: Biografía ---
    const biographyGroup = document.createElement("div");
    biographyGroup.classList.add("form_group");
    const bioLabel = document.createElement("label");
    bioLabel.htmlFor = "biography";
    bioLabel.textContent = "Tu Biografía (cuéntanos sobre ti)";
    bioLabel.classList.add("form_label");

    const bioTextarea = document.createElement("textarea");
    bioTextarea.id = "biography";
    bioTextarea.name = "biografia";
    bioTextarea.classList.add("form_textarea");
    bioTextarea.placeholder = "Describe tu estilo, influencias, trayectoria...";
    bioTextarea.rows = 5;
    biographyGroup.appendChild(bioLabel);
    biographyGroup.appendChild(bioTextarea);
    form.appendChild(biographyGroup);

    // --- Campo: Foto del Artista (Drag & Drop) ---
    const photoGroup = document.createElement("div");
    photoGroup.classList.add("form_group", "file_upload_group");

    const photoDropArea = document.createElement("div");
    photoDropArea.classList.add("drop_area", "photo_drop_area");
    photoDropArea.innerHTML = `
        <i class="fas fa-camera upload_icon"></i>
        <p class="drop_text">Arrastra tu foto de perfil aquí o <span class="browse_link">haz clic para seleccionar</span></p>
        <div class="file_preview_container">
            <img id="photoPreview" class="photo_preview hidden" src="" alt="Vista previa de la foto">
            <button type="button" id="clearPhotoBtn" class="clear_photo_btn hidden"><i class="fas fa-times"></i></button>
        </div>
    `;

    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.id = "artistPhoto";
    photoInput.name = "artistPhoto"; // Nombre para el FormData
    photoInput.accept = "image/*"; // Solo imágenes
    photoInput.classList.add("hidden_file_input");

    photoGroup.appendChild(photoDropArea);
    photoGroup.appendChild(photoInput);
    form.appendChild(photoGroup);

    const photoPreview = photoDropArea.querySelector("#photoPreview");
    const clearPhotoBtn = photoDropArea.querySelector("#clearPhotoBtn");
    const photoDropText = photoDropArea.querySelector(".drop_text");
    const photoUploadIcon = photoDropArea.querySelector(".upload_icon");

    // Helper para actualizar la vista previa de la foto
    const updatePhotoPreview = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                photoPreview.src = e.target.result;
                photoPreview.classList.remove("hidden");
                clearPhotoBtn.classList.remove("hidden");
                photoDropText.classList.add("hidden");
                photoUploadIcon.classList.add("hidden");
                photoDropArea.classList.add("has_file");
            };
            reader.readAsDataURL(file);
        } else {
            photoPreview.src = "";
            photoPreview.classList.add("hidden");
            clearPhotoBtn.classList.add("hidden");
            photoDropText.classList.remove("hidden");
            photoUploadIcon.classList.remove("hidden");
            photoDropArea.classList.remove("has_file");
        }
    };

    // Event Listeners para Drag & Drop de la foto
    photoDropArea.addEventListener("click", () => photoInput.click());
    photoDropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        photoDropArea.classList.add("drag_over");
        photoDropText.textContent = "Suelta tu imagen aquí...";
    });
    photoDropArea.addEventListener("dragleave", () => {
        photoDropArea.classList.remove("drag_over");
        photoDropText.textContent = "Arrastra tu foto de perfil aquí o haz clic para seleccionar";
    });
    photoDropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        photoDropArea.classList.remove("drag_over");
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith("image/")) {
            selectedPhotoFile = files[0];
            updatePhotoPreview(selectedPhotoFile);
        } else {
            selectedPhotoFile = null;
            updatePhotoPreview(null);
            error({ message: "Por favor, selecciona un archivo de imagen válido." });
        }
    });

    // Event Listener para la selección de archivo normal de la foto
    photoInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0 && e.target.files[0].type.startsWith("image/")) {
            selectedPhotoFile = e.target.files[0];
            updatePhotoPreview(selectedPhotoFile);
        } else {
            selectedPhotoFile = null;
            updatePhotoPreview(null);
            error({ message: "Por favor, selecciona un archivo de imagen válido." });
        }
    });

    // Botón para limpiar la foto seleccionada
    clearPhotoBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que el clic en el botón active el input de archivo
        selectedPhotoFile = null;
        photoInput.value = ""; // Limpiar el input de archivo
        updatePhotoPreview(null);
    });

    // --- Campo: Géneros Musicales ---
    const genresGroup = document.createElement("div");
    genresGroup.classList.add("form_group");
    const genresLabel = document.createElement("label");
    genresLabel.textContent = "Géneros Musicales (selecciona uno o más)";
    genresLabel.classList.add("form_label");
    genresGroup.appendChild(genresLabel);

    const genresContainer = document.createElement("div");
    genresContainer.classList.add("genres_selection_container");
    genresGroup.appendChild(genresContainer);
    form.appendChild(genresGroup);

    // Función para cargar y mostrar géneros
    const loadGenres = async () => {
        genresContainer.innerHTML = '<p class="loading_genres">Cargando géneros...</p>';
        try {
            // Reemplaza con tu endpoint real para obtener géneros
            const response = await fetch("http://localhost:3000/api/generos_musicales", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al cargar los géneros.");
            }

            const genres = await response.json();
            genresContainer.innerHTML = ''; // Limpiar mensaje de carga

            if (genres.length === 0) {
                genresContainer.innerHTML = '<p class="no_genres_message">No hay géneros disponibles.</p>';
                return;
            }

            genres.forEach(genre => {
                const genreTag = document.createElement("button");
                genreTag.type = "button"; // Importante para que no envíe el formulario
                genreTag.classList.add("genre_tag");
                genreTag.dataset.genreId = genre.genero_id;
                genreTag.textContent = genre.nombre_genero;

                genreTag.addEventListener("click", () => {
                    if (selectedGenres.has(genre.genero_id)) {
                        selectedGenres.delete(genre.genero_id);
                        genreTag.classList.remove("selected");
                    } else {
                        selectedGenres.add(genre.genero_id);
                        genreTag.classList.add("selected");
                    }
                    console.log("Géneros seleccionados:", Array.from(selectedGenres));
                });
                genresContainer.appendChild(genreTag);
            });

        } catch (err) {
            console.error("Error loading genres:", err);
            genresContainer.innerHTML = `<p class="error_genres">Error al cargar géneros: ${err.message}</p>`;
        }
    };

    loadGenres(); // Cargar géneros al inicio

    // --- Botones de Acción ---
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("form_buttons_container");

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add("action_button", "submit_button");
    submitButton.innerHTML = '<i class="fa-solid fa-star"></i> Convertirme en Artista';
    buttonsContainer.appendChild(submitButton);

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.classList.add("action_button", "cancel_button");
    cancelButton.innerHTML = '<i class="fa-solid fa-times-circle"></i> Cancelar';
    cancelButton.addEventListener("click", () => {
        window.location.hash = "#Perfil"; // Redirigir al perfil
    });
    buttonsContainer.appendChild(cancelButton);

    form.appendChild(buttonsContainer);
    appContainer.appendChild(form);

    // --- Función de Ayuda para crear un grupo de input ---
    function createInputGroup(type, id, placeholder, iconClass, required = false) {
        const group = document.createElement("div");
        group.classList.add("form_group");

        const inputWrapper = document.createElement("div");
        inputWrapper.classList.add("input_wrapper");

        const icon = document.createElement("i");
        icon.classList.add(...iconClass.split(' '));
        inputWrapper.appendChild(icon);

        const input = document.createElement("input");
        input.type = type;
        input.id = id;
        input.name = id;
        input.classList.add("form_input");
        input.placeholder = placeholder;
        input.autocomplete = "off";
        input.required = required;

        inputWrapper.appendChild(input);
        group.appendChild(inputWrapper);
        return group;
    }

    // --- Manejador de Envío del Formulario ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const artistName = document.getElementById("artistName").value.trim();
        const biography = document.getElementById("biography").value.trim();

        // Validación del lado del cliente
        if (!artistName) {
            error({ message: "El nombre artístico es obligatorio." });
            return;
        }
        if (selectedGenres.size === 0) {
            error({ message: "Por favor, selecciona al menos un género musical." });
            return;
        }

        const formData = new FormData();
        formData.append("nombre_artista", artistName);
        formData.append("biografia", biography);
        formData.append("id_usuario", userId);
        if (selectedPhotoFile) {
            formData.append("fotoArtista", selectedPhotoFile); // 'fotoArtista' debe coincidir con el nombre esperado en el backend
        }
        formData.append("generos", JSON.stringify(Array.from(selectedGenres))); // Enviar géneros como JSON string

        try {
            // 1. Registrar al artista
            const registerArtistResponse = await fetch("http://localhost:3000/api/artistas/register", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData, // FormData se encarga del Content-Type
            });

            const registerArtistResult = await registerArtistResponse.json();

            if (!registerArtistResponse.ok || registerArtistResult.error) {
                console.error("Error al registrar artista:", registerArtistResult.message || registerArtistResponse.statusText);
                error({ message: registerArtistResult.message || "Error al registrar artista." });
                return;
            }

            const newArtistId = registerArtistResult.artista_id; // Asume que el backend devuelve el ID del nuevo artista

            // 2. Asociar géneros al artista (si el backend lo maneja por separado)
            // Si tu endpoint de registro de artista ya maneja los géneros, puedes omitir este paso.
            // Este es un ejemplo si necesitas una segunda llamada API.
            // const associateGenresResponse = await fetch("http://localhost:3000/api/artista_genero/add", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${token}`,
            //     },
            //     body: JSON.stringify({
            //         artista_id: newArtistId,
            //         generos_id: Array.from(selectedGenres)
            //     }),
            // });

            // const associateGenresResult = await associateGenresResponse.json();

            // if (!associateGenresResponse.ok || associateGenresResult.error) {
            //     console.error("Error al asociar géneros:", associateGenresResult.message || associateGenresResponse.statusText);
            //     error({ message: associateGenresResult.message || "Artista registrado, pero error al asociar géneros." });
            //     return;
            // }

            success({ message: `¡Felicidades, ${artistName}! Ahora eres un artista.` });
            // Redirigir al perfil o a una página de éxito
            form.reset(); // Limpiar campos
            selectedPhotoFile = null;
            updatePhotoPreview(null);
            selectedGenres.clear();
            genresContainer.querySelectorAll(".genre_tag").forEach(tag => tag.classList.remove("selected"));

            window.location.hash = "#Perfil"; // O a una página de "Mi Estudio"
        } catch (err) {
            console.error("Error de conexión al intentar registrar artista:", err);
            error({ message: "Error de conexión al intentar registrar artista." });
        }
    });
};