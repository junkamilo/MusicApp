// editUserProfile.js

import { error, success } from "../../helpers/alerts";
import "./editUserProfile.css";

/**
 * Renderiza el formulario de edición del perfil del usuario.
 * @param {HTMLElement} contenedorPrincipal - El elemento DOM donde se renderizará el formulario.
 */
export const editUserProfile = async (contenedorPrincipal) => {
  if (!contenedorPrincipal) {
    console.error(
      "Error: Se requiere un contenedor principal para el formulario de edición de perfil."
    );
    return;
  }

  contenedorPrincipal.innerHTML = "";
  contenedorPrincipal.classList.add("edit_profile_container");

  // Obtener datos del usuario
  let userData = null;
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.hash = "#Login";
      return;
    }

    const response = await fetch(`http://localhost:3000/auth/user-info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent =
        "No se pudo cargar la información de tu perfil.";
      contenedorPrincipal.appendChild(errorMessage);
      return;
    }

    userData = result.data;
  } catch (error) {
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "Error al cargar tu perfil para edición.";
    contenedorPrincipal.appendChild(errorMessage);
    return;
  }

  // Crear formulario
  const formTitle = document.createElement("h1");
  formTitle.classList.add("edit_profile_title");
  formTitle.textContent = "Editar Tu Perfil";
  contenedorPrincipal.appendChild(formTitle);

  const form = document.createElement("form");
  form.classList.add("edit_profile_form");
  form.noValidate = true;

  // Campo Nombre
  const nameGroup = createInputGroup(
    "text",
    "nombre",
    "Tu Nombre",
    userData.nombre,
    "fa-solid fa-user"
  );
  form.appendChild(nameGroup);

  // Campo Email (editable ahora)
  const emailGroup = createInputGroup(
    "email",
    "email",
    "Tu Email",
    userData.email,
    "fa-solid fa-envelope"
  );
  form.appendChild(emailGroup);

  // Botones
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("form_buttons_container");

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.classList.add("action_button", "save_button");
  saveButton.innerHTML =
    '<i class="fa-solid fa-check-circle"></i> Guardar Cambios';
  buttonsContainer.appendChild(saveButton);

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.classList.add("action_button", "cancel_button");
  cancelButton.innerHTML = '<i class="fa-solid fa-times-circle"></i> Cancelar';
  cancelButton.addEventListener("click", () => {
    window.location.hash = "#Perfil";
  });
  buttonsContainer.appendChild(cancelButton);

  form.appendChild(buttonsContainer);
  contenedorPrincipal.appendChild(form);

  // Función para crear grupos de input
  function createInputGroup(type, id, placeholder, value, iconClass) {
    const group = document.createElement("div");
    group.classList.add("form_group");

    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("input_wrapper");

    const icon = document.createElement("i");
    icon.classList.add(...iconClass.split(" "));
    inputWrapper.appendChild(icon);

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = id;
    input.classList.add("form_input");
    input.placeholder = placeholder;
    input.value = value || "";
    input.autocomplete = "off";

    inputWrapper.appendChild(input);
    group.appendChild(inputWrapper);
    return group;
  }

  // Envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedName = document.getElementById("nombre").value;
    const updatedEmail = document.getElementById("email").value;

    const payload = {
      nombre: updatedName,
      email: updatedEmail,
    };

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:3000/auth/actualizar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        error({ message: result.message || "Error al actualizar tu perfil." });
        return;
      }

      success({ message: "Perfil actualizado exitosamente!" });
      window.dispatchEvent(new CustomEvent("usuario:logueado"));
      window.location.hash = "#Perfil";
    } catch (err) {
      error({ message: "Error de conexión al intentar actualizar tu perfil." });
    }
  });
};
