// components/uploadSong/uploadSong.js

import { error, success } from "../../helpers/alerts";
import "./uploadSong.css";

/**
 * Renders the form for uploading a new song.
 * @param {HTMLElement} contenedorPrincipal - The DOM element where the form will be rendered.
 */
export const uploadSong = async (contenedorPrincipal) => {
    if (!contenedorPrincipal) {
        console.error("Error: Se requiere un contenedor principal para el formulario de subida de canciones.");
        return;
    }

    contenedorPrincipal.innerHTML = '';
    contenedorPrincipal.classList.add("upload_song_container");

    // --- Título del Formulario ---
    const formTitle = document.createElement("h1");
    formTitle.classList.add("upload_song_title");
    formTitle.textContent = "Sube Tu Música";
    contenedorPrincipal.appendChild(formTitle);

    // --- Formulario ---
    const form = document.createElement("form");
    form.classList.add("upload_song_form");
    form.noValidate = true;
    form.enctype = "multipart/form-data";

    let selectedFile = null;

    // --- Campo de Subida de Archivo (Drag & Drop) ---
    const fileGroup = document.createElement("div");
    fileGroup.classList.add("form_group", "file_upload_group");

    const dropArea = document.createElement("div");
    dropArea.classList.add("drop_area");
    dropArea.innerHTML = `
        <i class="fas fa-cloud-upload-alt upload_icon"></i>
        <p class="drop_text">Arrastra tu archivo MP3 aquí o <span class="browse_link">haz clic para seleccionar</span></p>
        <p class="file_name_display"></p>
    `;

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "songFile";
    fileInput.name = "audioFile";
    fileInput.accept = "audio/mp3,audio/mpeg";
    fileInput.classList.add("hidden_file_input");

    fileGroup.appendChild(dropArea);
    fileGroup.appendChild(fileInput);
    form.appendChild(fileGroup);

    const fileNameDisplay = dropArea.querySelector(".file_name_display");

    dropArea.addEventListener("click", () => fileInput.click());

    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("drag_over");
        dropArea.querySelector(".drop_text").textContent = "Suelta tu archivo MP3 aquí...";
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("drag_over");
        dropArea.querySelector(".drop_text").textContent = "Arrastra tu archivo MP3 aquí o haz clic para seleccionar";
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.classList.remove("drag_over");
        const files = e.dataTransfer.files;
        if (files.length > 0 && (files[0].type === "audio/mp3" || files[0].type === "audio/mpeg")) {
            selectedFile = files[0];
            fileNameDisplay.textContent = `Archivo seleccionado: ${selectedFile.name}`;
            dropArea.querySelector(".drop_text").textContent = "¡Listo para subir!";
        } else {
            selectedFile = null;
            fileNameDisplay.textContent = "";
            dropArea.querySelector(".drop_text").textContent = "Solo archivos MP3 son permitidos.";
            error({ message: "Por favor, selecciona un archivo MP3 válido." });
        }
    });

    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0 && (e.target.files[0].type === "audio/mp3" || e.target.files[0].type === "audio/mpeg")) {
            selectedFile = e.target.files[0];
            fileNameDisplay.textContent = `Archivo seleccionado: ${selectedFile.name}`;
            dropArea.querySelector(".drop_text").textContent = "¡Listo para subir!";
        } else {
            selectedFile = null;
            fileNameDisplay.textContent = "";
            dropArea.querySelector(".drop_text").textContent = "Solo archivos MP3 son permitidos.";
            error({ message: "Por favor, selecciona un archivo MP3 válido." });
        }
    });

    // --- Campo: Título ---
    const titleGroup = createInputGroup("text", "songTitle", "Título de la Canción", "fa-solid fa-music");
    form.appendChild(titleGroup);

    // --- Campo: Duración ---
    const durationGroup = createInputGroup("text", "songDuration", "Duración (ej. 3:45)", "fa-solid fa-clock");
    form.appendChild(durationGroup);

    // --- Botones ---
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("form_buttons_container");

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add("action_button", "submit_button");
    submitButton.innerHTML = '<i class="fa-solid fa-upload"></i> Subir Canción';
    buttonsContainer.appendChild(submitButton);

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.classList.add("action_button", "cancel_button");
    cancelButton.innerHTML = '<i class="fa-solid fa-times-circle"></i> Cancelar';
    cancelButton.addEventListener("click", () => {
        window.location.hash = "#Home";
    });
    buttonsContainer.appendChild(cancelButton);

    form.appendChild(buttonsContainer);
    contenedorPrincipal.appendChild(form);

    // --- Función de ayuda ---
    function createInputGroup(type, id, placeholder, iconClass) {
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
        input.required = id === "songTitle";

        inputWrapper.appendChild(input);
        group.appendChild(inputWrapper);
        return group;
    }

    // --- Envío del Formulario ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Formulario enviado");

        const songTitle = document.getElementById("songTitle").value.trim();
        const songDuration = document.getElementById("songDuration").value.trim();

        if (!selectedFile) {
            error({ message: "Por favor, selecciona un archivo MP3 para subir." });
            return;
        }
        if (!songTitle) {
            error({ message: "El título de la canción es obligatorio." });
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;

        if (!userId) {
            console.warn("No se encontró ID de usuario. Redirigiendo a login.");
            window.location.hash = "#Login";
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("titulo", songTitle);
        formData.append("duracion", songDuration);

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.warn("No access token. Redirigiendo a login.");
                window.location.hash = "#Login";
                return;
            }

            const response = await fetch(`http://localhost:3000/api/upload/user-audio/${userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (!response.ok || result.error) {
                console.error("Error al subir la canción:", result.message || response.statusText);
                error({ message: result.message || "Error al subir la canción." });
                return;
            }

            success({ message: "¡Canción subida exitosamente!" });

            form.reset();
            selectedFile = null;
            fileNameDisplay.textContent = "";
            dropArea.querySelector(".drop_text").textContent = "Arrastra tu archivo MP3 aquí o haz clic para seleccionar";
            window.location.hash = "#SubirCancion";

        } catch (err) {
            console.error("Error de conexión al intentar subir la canción:", err);
            error({ message: "Error de conexión al intentar subir la canción." });
        }
    });
};
