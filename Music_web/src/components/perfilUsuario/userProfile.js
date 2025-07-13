// userProfile.js

import "./userProfile.css"; // Asegúrate de que este CSS esté enlazado

/**
 * Renderiza el perfil del usuario logueado.
 * @param {HTMLElement} contenedorPrincipal - El elemento DOM donde se renderizará el perfil.
 */
export const userProfile = async (contenedorPrincipal) => {
    if (!contenedorPrincipal) {
        console.error("Error: Se requiere un contenedor principal para el perfil del usuario.");
        return;
    }

    // Limpiar el contenedor principal antes de renderizar el nuevo perfil
    contenedorPrincipal.innerHTML = '';
    contenedorPrincipal.classList.add("user_profile_container"); // Clase principal del contenedor

    // --- 1. Obtener datos del usuario ---
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.warn("No hay token de acceso. Redirigiendo a login.");
            window.location.hash = "#Login";
            return;
        }

        // Asumiendo un endpoint para obtener el perfil del usuario logueado
        const response = await fetch(`http://localhost:3000/auth/user-info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok || result.error) {
            console.error("Error al obtener datos del usuario:", result.message || response.statusText);
            const errorMessage = document.createElement('p');
            errorMessage.classList.add("error-message");
            errorMessage.textContent = "No se pudo cargar la información de tu perfil.";
            contenedorPrincipal.appendChild(errorMessage);
            return;
        }

        const userData = result.data; // Asumiendo que los datos vienen en una propiedad 'data'

        // --- 2. Construir la sección de Héroe del perfil ---
        const userHeroSection = document.createElement("section");
        userHeroSection.classList.add("user_hero_section");

        const profilePhotoWrapper = document.createElement("div");
        profilePhotoWrapper.classList.add("profile_photo_wrapper");
        const profilePhoto = document.createElement("img");
        profilePhoto.classList.add("user_profile_photo");
        profilePhoto.src = userData.url_foto_perfil || "./assets/perfil_default.png"; // Placeholder
        profilePhoto.alt = userData.nombre || "Usuario";
        profilePhotoWrapper.appendChild(profilePhoto);

        const userInfoHero = document.createElement("div");
        userInfoHero.classList.add("user_info_hero");

        const userName = document.createElement("h1");
        userName.classList.add("user_name");
        userName.textContent = userData.nombre || "Usuario Desconocido";

        const userEmail = document.createElement("p");
        userEmail.classList.add("user_email");
        userEmail.textContent = userData.email || "Email no disponible";

        const userMemberSince = document.createElement("p");
        userMemberSince.classList.add("user_member_since");
        const registrationDate = userData.fecha_registro ? new Date(userData.fecha_registro).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : "Fecha no disponible";
        userMemberSince.textContent = `Miembro desde: ${registrationDate}`;

        userInfoHero.appendChild(userName);
        userInfoHero.appendChild(userEmail);
        userInfoHero.appendChild(userMemberSince);

        userHeroSection.appendChild(profilePhotoWrapper);
        userHeroSection.appendChild(userInfoHero);
        contenedorPrincipal.appendChild(userHeroSection);

        // --- 3. Sección de Botones de Acción ---
        const userActionsSection = document.createElement("section");
        userActionsSection.classList.add("user_actions_section");

        const editProfileButton = document.createElement("button");
        editProfileButton.classList.add("action_button", "edit_profile_button");
        editProfileButton.innerHTML = '<i class="fa-solid fa-user-pen"></i> Editar Perfil';
        editProfileButton.addEventListener("click", () => {
            window.location.hash = "#EditarPerfil";
        });

        const changePasswordButton = document.createElement("button");
        changePasswordButton.classList.add("action_button", "change_password_button");
        changePasswordButton.innerHTML = '<i class="fa-solid fa-key"></i> Cambiar Contraseña';
        changePasswordButton.addEventListener("click", () => {
            console.log("Cambiar contraseña clickeado");
            // Lógica para navegar a la página de cambio de contraseña
            window.location.hash = "#EditarContrasena";
        });

        userActionsSection.appendChild(editProfileButton);
        userActionsSection.appendChild(changePasswordButton);
        contenedorPrincipal.appendChild(userActionsSection);

        // --- 4. Sección de Enlaces a Favoritos ---
        const userFavoritesSection = document.createElement("section");
        userFavoritesSection.classList.add("user_favorites_section");

        const favoritesTitle = document.createElement("h2");
        favoritesTitle.classList.add("favorites_title");
        favoritesTitle.textContent = "Tu Música Favorita";
        userFavoritesSection.appendChild(favoritesTitle);

        const favoritesLinksContainer = document.createElement("div");
        favoritesLinksContainer.classList.add("favorites_links_container");

        const favoriteCategories = [
            { label: "Géneros Favoritos", iconClass: "fa-solid fa-compact-disc", hash: "#GenerosFavoritos" },
            { label: "Artistas Favoritos", iconClass: "fa-solid fa-user-group", hash: "#ArtistasFavoritos" },
            { label: "Álbumes Favoritos", iconClass: "fa-solid fa-book-open", hash: "#AlbumesFavoritos" },
            { label: "Canciones Favoritas", iconClass: "fa-solid fa-heart", hash: "#CancionesFavoritos" },
            { label: "Canciones Subidas", iconClass: "fa-solid fa-heart", hash: "#MostrarCanciones" },
        ];

        favoriteCategories.forEach(({ label, iconClass, hash }) => {
            const linkCard = document.createElement("a");
            linkCard.href = hash;
            linkCard.classList.add("favorite_link_card");

            const iconElement = document.createElement("i");
            iconElement.classList.add(...iconClass.split(' '));

            const labelElement = document.createElement("span");
            labelElement.textContent = label;

            linkCard.appendChild(iconElement);
            linkCard.appendChild(labelElement);
            favoritesLinksContainer.appendChild(linkCard);
        });

        userFavoritesSection.appendChild(favoritesLinksContainer);
        contenedorPrincipal.appendChild(userFavoritesSection);

    } catch (error) {
        console.error("Error al cargar el perfil del usuario:", error);
        const errorMessage = document.createElement('p');
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Ocurrió un error al cargar tu perfil.";
        contenedorPrincipal.appendChild(errorMessage);
    }
};