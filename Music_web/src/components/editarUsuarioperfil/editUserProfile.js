// editUserProfile.js

import { error, success } from "../../helpers/alerts";
import "./editUserProfile.css";


/**
 * Renderiza el formulario de edición del perfil del usuario.
 * @param {HTMLElement} contenedorPrincipal - El elemento DOM donde se renderizará el formulario.
 */
export const editUserProfile = async (contenedorPrincipal) => {
    if (!contenedorPrincipal) {
        console.error("Error: Se requiere un contenedor principal para el formulario de edición de perfil.");
        return;
    }

    // Limpiar el contenedor principal antes de renderizar
    contenedorPrincipal.innerHTML = '';
    contenedorPrincipal.classList.add("edit_profile_container"); // Clase principal del contenedor

    // --- 1. Obtener datos del usuario actual para pre-rellenar el formulario ---
    let userData = null;
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.warn("No hay token de acceso. Redirigiendo a login.");
            window.location.hash = "#Login";
            return;
        }

        const response = await fetch(`http://localhost:3000/auth/user-info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok || result.error) {
            console.error("Error al obtener datos del usuario para edición:", result.message || response.statusText);
            const errorMessage = document.createElement('p');
            errorMessage.classList.add("error-message");
            errorMessage.textContent = "No se pudo cargar la información de tu perfil para editar.";
            contenedorPrincipal.appendChild(errorMessage);
            return;
        }

        userData = result.data;

    } catch (error) {
        console.error("Error al cargar el perfil para edición:", error);
        const errorMessage = document.createElement('p');
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Ocurrió un error al cargar tu perfil para edición.";
        contenedorPrincipal.appendChild(errorMessage);
        return;
    }

    // --- 2. Construir la interfaz del formulario de edición ---
    const formTitle = document.createElement("h1");
    formTitle.classList.add("edit_profile_title");
    formTitle.textContent = "Editar Tu Perfil";
    contenedorPrincipal.appendChild(formTitle);

    const form = document.createElement("form");
    form.classList.add("edit_profile_form");
    form.noValidate = true; // Deshabilita la validación HTML5 por defecto si planeas validación JS

    // Campo de Foto de Perfil
    const photoGroup = document.createElement("div");
    photoGroup.classList.add("form_group", "photo_upload_group");

    const currentPhotoLabel = document.createElement("p");
    currentPhotoLabel.classList.add("current_photo_label");
    currentPhotoLabel.textContent = "Foto de Perfil Actual:";
    photoGroup.appendChild(currentPhotoLabel);

    const photoPreview = document.createElement("img");
    photoPreview.classList.add("photo_preview");
    photoPreview.src = userData.url_foto_perfil || "./assets/perfil_default.png";
    photoPreview.alt = "Foto de perfil";
    photoGroup.appendChild(photoPreview);

    const fileInputLabel = document.createElement("label");
    fileInputLabel.classList.add("custom_file_upload");
    fileInputLabel.innerHTML = '<i class="fa-solid fa-upload"></i> Subir Nueva Foto';
    
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "profilePhotoInput";
    fileInput.accept = "image/*";
    fileInput.style.display = "none"; // Ocultar el input real
    fileInputLabel.setAttribute("for", "profilePhotoInput"); // Enlazar label con input
    
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                photoPreview.src = event.target.result; // Muestra la vista previa
            };
            reader.readAsDataURL(file);
        }
    });

    photoGroup.appendChild(fileInputLabel);
    photoGroup.appendChild(fileInput);
    form.appendChild(photoGroup);


    // Campo de Nombre
    const nameGroup = createInputGroup("text", "nombre", "Tu Nombre", userData.nombre, "fa-solid fa-user");
    form.appendChild(nameGroup);

    // Campo de Email (deshabilitado para edición si no se permite cambiarlo)
    const emailGroup = createInputGroup("email", "email", "Tu Email", userData.email, "fa-solid fa-envelope", true);
    form.appendChild(emailGroup);

    // Contenedor de botones de acción
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("form_buttons_container");

    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.classList.add("action_button", "save_button");
    saveButton.innerHTML = '<i class="fa-solid fa-check-circle"></i> Guardar Cambios';
    buttonsContainer.appendChild(saveButton);

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.classList.add("action_button", "cancel_button");
    cancelButton.innerHTML = '<i class="fa-solid fa-times-circle"></i> Cancelar';
    cancelButton.addEventListener("click", () => {
        window.location.hash = "#Perfil"; // Redirige de vuelta al perfil
    });
    buttonsContainer.appendChild(cancelButton);

    form.appendChild(buttonsContainer);
    contenedorPrincipal.appendChild(form);

    // --- Función auxiliar para crear grupos de input ---
    function createInputGroup(type, id, placeholder, value, iconClass, isDisabled = false) {
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
        input.value = value || '';
        input.disabled = isDisabled;
        input.autocomplete = "off"; // Deshabilita autocompletado del navegador

        inputWrapper.appendChild(input);
        group.appendChild(inputWrapper);
        return group;
    }

    // --- Manejo del envío del formulario ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedName = document.getElementById("nombre").value;
        const updatedEmail = document.getElementById("email").value; // Aunque esté deshabilitado, podemos leerlo
        const photoFile = document.getElementById("profilePhotoInput").files[0];

        const formData = new FormData();
        formData.append("nombre", updatedName);
        formData.append("email", updatedEmail); // Enviar email aunque no se edite, si tu API lo espera

        if (photoFile) {
            formData.append("url_foto_perfil", photoFile); // El nombre del campo debe coincidir con tu backend
        }

        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch(`http://localhost:3000/usuarios/me`, { // Asumiendo endpoint PUT para actualizar
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    // 'Content-Type': 'application/json' NO USAR con FormData
                },
                body: formData, // FormData se encarga de setting el Content-Type correcto
            });

            const result = await response.json();

            if (!response.ok || result.error) {
                console.error("Error al actualizar perfil:", result.message || response.statusText);
                error({ message: result.message || "Error al actualizar tu perfil." });
                return;
            }

            success({ message: "Perfil actualizado exitosamente!" });
            // Disparar evento para que el header/sidebar se actualice si muestra nombre/foto
            window.dispatchEvent(new CustomEvent('usuario:logueado'));
            window.location.hash = "#Perfil"; // Redirige de vuelta al perfil actualizado

        } catch (err) {
            console.error("Error de conexión al actualizar perfil:", err);
            error({ message: "Error de conexión al intentar actualizar tu perfil." });
        }
    });
};