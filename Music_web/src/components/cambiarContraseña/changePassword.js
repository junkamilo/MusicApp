// changePassword.js

import { error, success } from "../../helpers/alerts";
import "./changePassword.css"; // Asegúrate de que este CSS esté enlazado


/**
 * Renderiza el formulario para cambiar la contraseña del usuario.
 * @param {HTMLElement} contenedorPrincipal - El elemento DOM donde se renderizará el formulario.
 */
export const changePassword = async (contenedorPrincipal) => {
    if (!contenedorPrincipal) {
        console.error("Error: Se requiere un contenedor principal para el formulario de cambio de contraseña.");
        return;
    }

    // Limpiar el contenedor principal antes de renderizar
    contenedorPrincipal.innerHTML = '';
    contenedorPrincipal.classList.add("change_password_container"); // Clase principal del contenedor

    // --- Título del formulario ---
    const formTitle = document.createElement("h1");
    formTitle.classList.add("change_password_title");
    formTitle.textContent = "Cambiar Contraseña";
    contenedorPrincipal.appendChild(formTitle);

    // --- Formulario ---
    const form = document.createElement("form");
    form.classList.add("change_password_form");
    form.noValidate = true; // Deshabilita la validación HTML5 por defecto

    // Campo: Contraseña Actual
    const currentPasswordGroup = createInputGroup("password", "currentPassword", "Contraseña Actual", "fa-solid fa-lock");
    form.appendChild(currentPasswordGroup);

    // Campo: Nueva Contraseña
    const newPasswordGroup = createInputGroup("password", "newPassword", "Nueva Contraseña", "fa-solid fa-key");
    form.appendChild(newPasswordGroup);

    // Campo: Confirmar Nueva Contraseña
    const confirmNewPasswordGroup = createInputGroup("password", "confirmNewPassword", "Confirmar Nueva Contraseña", "fa-solid fa-key");
    form.appendChild(confirmNewPasswordGroup);

    // Contenedor de botones de acción
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("form_buttons_container");

    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.classList.add("action_button", "save_button");
    saveButton.innerHTML = '<i class="fa-solid fa-check-circle"></i> Cambiar Contraseña';
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


    // --- Función auxiliar para crear grupos de input con toggle de visibilidad ---
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
        input.required = true; // Hace que el campo sea obligatorio

        inputWrapper.appendChild(input);

        // Agrega el botón de toggle de visibilidad solo para campos de contraseña
        if (type === "password") {
            const toggleButton = document.createElement("button");
            toggleButton.type = "button";
            toggleButton.classList.add("password_toggle_button");
            toggleButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'; // Icono de ojo tachado
            toggleButton.addEventListener("click", () => {
                if (input.type === "password") {
                    input.type = "text";
                    toggleButton.innerHTML = '<i class="fa-solid fa-eye"></i>'; // Icono de ojo
                } else {
                    input.type = "password";
                    toggleButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
                }
            });
            inputWrapper.appendChild(toggleButton);
        }

        group.appendChild(inputWrapper);
        return group;
    }

    // --- Manejo del envío del formulario ---
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmNewPassword = document.getElementById("confirmNewPassword").value;

        // Validación básica en el cliente
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            error({ message: "Por favor, completa todos los campos." });
            return;
        }

        if (newPassword !== confirmNewPassword) {
            error({ message: "La nueva contraseña y la confirmación no coinciden." });
            return;
        }

        if (newPassword.length < 6) {
            error({ message: "La nueva contraseña debe tener al menos 6 caracteres." });
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                console.warn("No hay token de acceso. Redirigiendo a login.");
                window.location.hash = "#Login";
                return;
            }

            const response = await fetch(`http://localhost:3000/auth/cambiar-password`, { // Asume este endpoint
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                }),
            });

            const result = await response.json();

            if (!response.ok || result.error) {
                console.error("Error al cambiar contraseña:", result.message || response.statusText);
                error({ message: result.message || "Error al cambiar tu contraseña." });
                return;
            }

            success({ message: "Contraseña cambiada exitosamente!" });
            // Opcional: Redirigir al perfil o a la página de inicio de sesión
            window.location.hash = "#Perfil";

        } catch (err) {
            console.error("Error de conexión al cambiar contraseña:", err);
            error({ message: "Error de conexión al intentar cambiar la contraseña." });
        }
    });
};