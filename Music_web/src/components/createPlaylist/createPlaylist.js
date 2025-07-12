// createPlaylist.js

import "./createPlaylist.css"; // Asegúrate de que este CSS esté enlazado
import { success, error } from "../../helpers/alerts.js"; // Para mensajes de éxito/error

/**
 * Renders the form for creating a new playlist.
 * @param {HTMLElement} contenedorPrincipal - The DOM element where the form will be rendered.
 */
export const createPlaylist = async (contenedorPrincipal) => {
    if (!contenedorPrincipal) {
        console.error("Error: A main container is required for the playlist creation form.");
        return;
    }

    // Clear the main container before rendering the new form
    contenedorPrincipal.innerHTML = '';
    contenedorPrincipal.classList.add("create_playlist_container"); // Main class for the container

    // --- Form Title ---
    const formTitle = document.createElement("h1");
    formTitle.classList.add("create_playlist_title");
    formTitle.textContent = "Crear Nueva Playlist";
    contenedorPrincipal.appendChild(formTitle);

    // --- Form Element ---
    const form = document.createElement("form");
    form.classList.add("create_playlist_form");
    form.noValidate = true; // Disable default HTML5 validation

    // Input field: Playlist Name
    const nameGroup = createInputGroup("text", "playlistName", "Nombre de la Playlist", "fa-solid fa-music");
    form.appendChild(nameGroup);

    // Textarea field: Description
    const descriptionGroup = createTextareaGroup("playlistDescription", "Descripción (opcional)", "fa-solid fa-align-left");
    form.appendChild(descriptionGroup);

    // Buttons Container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("form_buttons_container");

    const createButton = document.createElement("button");
    createButton.type = "submit";
    createButton.classList.add("action_button", "create_button");
    createButton.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Crear Playlist';
    buttonsContainer.appendChild(createButton);

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.classList.add("action_button", "cancel_button");
    cancelButton.innerHTML = '<i class="fa-solid fa-times-circle"></i> Cancelar';
    cancelButton.addEventListener("click", () => {
        window.location.hash = "#Perfil"; // Redirect back to profile or playlists list
    });
    buttonsContainer.appendChild(cancelButton);

    form.appendChild(buttonsContainer);
    contenedorPrincipal.appendChild(form);

    // --- Helper function to create an input group ---
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
        input.required = true; // Make name required

        inputWrapper.appendChild(input);
        group.appendChild(inputWrapper);
        return group;
    }

    // --- Helper function to create a textarea group ---
    function createTextareaGroup(id, placeholder, iconClass) {
        const group = document.createElement("div");
        group.classList.add("form_group");

        const inputWrapper = document.createElement("div");
        inputWrapper.classList.add("input_wrapper");
        inputWrapper.classList.add("textarea_wrapper"); // Specific class for textarea wrapper

        const icon = document.createElement("i");
        icon.classList.add(...iconClass.split(' '));
        inputWrapper.appendChild(icon);

        const textarea = document.createElement("textarea");
        textarea.id = id;
        textarea.name = id;
        textarea.classList.add("form_textarea");
        textarea.placeholder = placeholder;
        textarea.rows = 4; // Default rows
        textarea.maxLength = 500; // Example max length

        inputWrapper.appendChild(textarea);
        group.appendChild(inputWrapper);
        return group;
    }

    // --- Form Submission Handler ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const playlistName = document.getElementById("playlistName").value.trim();
        const playlistDescription = document.getElementById("playlistDescription").value.trim();

        // Basic client-side validation
        if (!playlistName) {
            error({ message: "El nombre de la playlist es obligatorio." });
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.warn("No access token. Redirecting to login.");
                window.location.hash = "#Login";
                return;
            }

            const response = await fetch(`http://localhost:3000/playlists`, { // Assuming this endpoint for creating playlists
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nombre: playlistName,
                    descripcion: playlistDescription,
                }),
            });

            const result = await response.json();

            if (!response.ok || result.error) {
                console.error("Error creating playlist:", result.message || response.statusText);
                error({ message: result.message || "Error al crear la playlist." });
                return;
            }

            success({ message: "¡Playlist creada exitosamente!" });
            // Redirect to user's playlists or the new playlist's page
            window.location.hash = "#MisPlaylists"; // Assuming a route for user's playlists

        } catch (err) {
            console.error("Connection error creating playlist:", err);
            error({ message: "Error de conexión al intentar crear la playlist." });
        }
    });
};