// userProfile.js

import "./userProfile.css";

/**
 * Renderiza el perfil del usuario logueado.
 * @param {HTMLElement} contenedorPrincipal - El elemento DOM donde se renderizará el perfil.
 */
export const userProfile = async (contenedorPrincipal) => {
  if (!contenedorPrincipal) {
    console.error("Error: Se requiere un contenedor principal para el perfil del usuario.");
    return;
  }

  contenedorPrincipal.innerHTML = "";
  contenedorPrincipal.classList.add("user_profile_container");

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
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      console.error("Error al obtener datos del usuario:", result.message || response.statusText);
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = "No se pudo cargar la información de tu perfil.";
      contenedorPrincipal.appendChild(errorMessage);
      return;
    }

    const userData = result.data;

    // --- Hero de Perfil ---
    const userHeroSection = document.createElement("section");
    userHeroSection.classList.add("user_hero_section");

    const profilePhotoWrapper = document.createElement("div");
    profilePhotoWrapper.classList.add("profile_photo_wrapper");
    const profilePhoto = document.createElement("img");
    profilePhoto.classList.add("user_profile_photo");
    profilePhoto.src = userData.url_foto_perfil || "./assets/perfil_default.png";
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
    const registrationDate = userData.fecha_registro
      ? new Date(userData.fecha_registro).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Fecha no disponible";
    userMemberSince.textContent = `Miembro desde: ${registrationDate}`;

    userInfoHero.appendChild(userName);
    userInfoHero.appendChild(userEmail);
    userInfoHero.appendChild(userMemberSince);

    userHeroSection.appendChild(profilePhotoWrapper);
    userHeroSection.appendChild(userInfoHero);
    contenedorPrincipal.appendChild(userHeroSection);

    // --- Botones Acción ---
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
      window.location.hash = "#EditarContrasena";
    });

    userActionsSection.appendChild(editProfileButton);
    userActionsSection.appendChild(changePasswordButton);
    contenedorPrincipal.appendChild(userActionsSection);

    // --- Favoritos ---
    const userFavoritesSection = document.createElement("section");
    userFavoritesSection.classList.add("user_favorites_section");

    const favoritesTitle = document.createElement("h2");
    favoritesTitle.classList.add("favorites_title");
    favoritesTitle.textContent = "Tu Música Favorita";
    userFavoritesSection.appendChild(favoritesTitle);

    const favoritesLinksContainer = document.createElement("div");
    favoritesLinksContainer.classList.add("favorites_links_container");

    const favoriteCategories = [
      {
        label: "Géneros Favoritos",
        iconClass: "fa-solid fa-compact-disc",
        hash: "#GenerosFavoritos",
      },
      {
        label: "Artistas Favoritos",
        iconClass: "fa-solid fa-user-group",
        hash: "#ArtistasFavoritos",
      },
      {
        label: "Álbumes Favoritos",
        iconClass: "fa-solid fa-book-open",
        hash: "#AlbumesFavoritos",
      },
      {
        label: "Canciones Favoritas", // ✅ corregido aquí
        iconClass: "fa-solid fa-heart",
        hash: "#CancionesFavoritas", // ✅ corregido aquí
      },
    ];

    if (userData.rol !== "artista") {
      favoriteCategories.push({
        label: "Ser Artista",
        iconClass: "fa-solid fa-compact-disc",
        hash: "#SerArtista",
      });
    }

    favoriteCategories.forEach(({ label, iconClass, hash }) => {
      const linkCard = document.createElement("a");
      linkCard.href = hash;
      linkCard.classList.add("favorite_link_card");

      const iconElement = document.createElement("i");
      iconElement.classList.add(...iconClass.split(" "));

      const labelElement = document.createElement("span");
      labelElement.textContent = label;

      linkCard.appendChild(iconElement);
      linkCard.appendChild(labelElement);
      favoritesLinksContainer.appendChild(linkCard);
    });

    userFavoritesSection.appendChild(favoritesLinksContainer);
    contenedorPrincipal.appendChild(userFavoritesSection);

    // --- Herramientas de Artista ---
    if (userData.rol === "artista") {
      const artistaToolsSection = document.createElement("section");
      artistaToolsSection.classList.add("artista_tools_section");

      const toolsTitle = document.createElement("h2");
      toolsTitle.classList.add("artista_tools_title");
      toolsTitle.textContent = "Herramientas de Artista";

      const toolsContainer = document.createElement("div");
      toolsContainer.classList.add("tools_links_container");

      const tools = [
        {
          label: "Subir Álbum",
          iconClass: "fa-solid fa-cloud-arrow-up",
          hash: "#subirAlbum",
        },
        {
          label: "Mis Publicaciones",
          iconClass: "fa-solid fa-music",
          hash: "#MisPublicaciones",
        },
        {
          label: "Mi Perfil Público",
          iconClass: "fa-solid fa-user",
          hash: `#/artistas/${userData.artista_id}`,
        },
      ];

      tools.forEach(({ label, iconClass, hash }) => {
        const toolLink = document.createElement("a");
        toolLink.href = hash;
        toolLink.classList.add("favorite_link_card");

        const icon = document.createElement("i");
        icon.classList.add(...iconClass.split(" "));

        const text = document.createElement("span");
        text.textContent = label;

        toolLink.appendChild(icon);
        toolLink.appendChild(text);
        toolsContainer.appendChild(toolLink);
      });

      artistaToolsSection.appendChild(toolsTitle);
      artistaToolsSection.appendChild(toolsContainer);
      contenedorPrincipal.appendChild(artistaToolsSection);
    }
  } catch (error) {
    console.error("Error al cargar el perfil del usuario:", error);
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "Ocurrió un error al cargar tu perfil.";
    contenedorPrincipal.appendChild(errorMessage);
  }
};


