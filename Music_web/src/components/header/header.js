// components/header/header.js (AJUSTADO PARA BOTÓN SUBIR CANCIÓN)
import { router } from "../../router/router";
import { estaAutenticado, logout } from "../../helpers/auth.js";
import "./header.css";

export const header = async () => {
    const headerElement = document.getElementById("header"); // Renombrado a headerElement para evitar conflicto con la función
    if (!headerElement) {
        console.error("No se encontró el elemento con id='header'");
        return;
    }

    headerElement.innerHTML = ""; // Limpiar el contenido previo

    const contentHeader = document.createElement("div");
    contentHeader.classList.add("content_header");

    // Contenedor para los iconos de navegación (Home y Perfil)
    const navIconsGroup = document.createElement("div");
    navIconsGroup.classList.add("nav_icons_group"); // Nuevo contenedor para agrupar iconos

    // ---------- HOME ----------
    const linkHome = document.createElement("a");
    linkHome.href = "#/";
    linkHome.classList.add("icon_link");

    const iconHome = document.createElement("i");
    iconHome.classList.add("fa-solid", "fa-house");
    linkHome.appendChild(iconHome);
    navIconsGroup.appendChild(linkHome); // Añadir al nuevo grupo

    // ---------- PERFIL ----------
    const linkPerfil = document.createElement("a");
    linkPerfil.href = "#Perfil";
    linkPerfil.classList.add("icon_link");

    const iconPerfil = document.createElement("i");
    iconPerfil.classList.add("fa-solid", "fa-user");
    linkPerfil.appendChild(iconPerfil);
    navIconsGroup.appendChild(linkPerfil); // Añadir al nuevo grupo

    contentHeader.appendChild(navIconsGroup); // Añadir el grupo al contentHeader

    // ---------- BUSCADOR ----------
    const contentBuscador = document.createElement("div");
    contentBuscador.classList.add("content_buscador");

    const contentLupa = document.createElement("div");
    contentLupa.classList.add("content_lupa");

    const iconLupa = document.createElement("i");
    iconLupa.classList.add("fa-solid", "fa-magnifying-glass");
    contentLupa.appendChild(iconLupa);

    const buscador = document.createElement("div");
    buscador.classList.add("buscador");

    const input = document.createElement("input");
    input.type = "search";
    input.classList.add("text_buscador");
    input.placeholder = "Buscar música, artistas...";
    input.addEventListener("input", () => {
        const termino = input.value.trim().toLowerCase();
        const evento = new CustomEvent("buscar:musica", {
            detail: { termino },
        });
        window.dispatchEvent(evento);
    });

    buscador.appendChild(input);
    contentBuscador.appendChild(contentLupa);
    contentBuscador.appendChild(buscador);
    contentHeader.appendChild(contentBuscador); // Añadir el buscador al contentHeader

    // Contenedor para botones de acción (Subir Canción y Logout)
    const actionButtonsGroup = document.createElement("div");
    actionButtonsGroup.classList.add("action_buttons_group"); // Nuevo contenedor para agrupar botones

    // ---------- BOTÓN SUBIR CANCIÓN (solo si está autenticado) ----------
    if (estaAutenticado()) {
        const uploadSongBtn = document.createElement("button");
        uploadSongBtn.id = "btn-upload-song";
        uploadSongBtn.classList.add("action_button", "upload_song_button");
        uploadSongBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Subir'; // Icono de subida
        uploadSongBtn.title = "Subir nueva canción";
        uploadSongBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.hash = "#SubirCancion"; // Ruta para el formulario de subida
        });
        actionButtonsGroup.appendChild(uploadSongBtn);
    }

    // ---------- LOGOUT (dinámico) ----------
    if (estaAutenticado()) {
        const logoutBtn = document.createElement("button");
        logoutBtn.id = "btn-logout";
        logoutBtn.textContent = "Cerrar Sesión";
        logoutBtn.classList.add("btn-logout");
        logoutBtn.addEventListener("click", logout);
        actionButtonsGroup.appendChild(logoutBtn);
    }

    contentHeader.appendChild(actionButtonsGroup); // Añadir el grupo de botones al contentHeader
    headerElement.appendChild(contentHeader); // Asegurarse de que el contentHeader se añada al header

    // Acciones al hacer click en los enlaces (ya existentes)
    linkHome.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = "#Home";
        router(document.getElementById("app"));
    });

    linkPerfil.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = "#Perfil";
    });
};

// ✅ Escuchar eventos globales para volver a cargar el header cuando el usuario se loguea o cierra sesión
window.addEventListener("usuario:logout", async () => {
    const headerEl = document.getElementById("header");
    if (headerEl) {
        await header();
    }
});

window.addEventListener("usuario:logueado", async () => {
    const headerEl = document.getElementById("header");
    if (headerEl) {
        await header();
    }
});
