// header.js (AJUSTADO PARA FONT AWESOME)
import { router } from "../../router/router";
import { estaAutenticado, logout } from "../../helpers/auth.js";
import "./header.css";

export const header = async () => {
    const header = document.getElementById("header");
    if (!header) {
        console.error("No se encontró el elemento con id='header'");
        return;
    }

    header.innerHTML = ""; // Limpiar el contenido previo

    const contentHeader = document.createElement("div");
    contentHeader.classList.add("content_header");

    // ---------- HOME ----------
    const contentHome = document.createElement("div");
    contentHome.classList.add("content_home");

    const linkHome = document.createElement("a");
    linkHome.href = "#/";
    linkHome.classList.add("icon_link"); // Nueva clase general para enlaces de iconos

    const iconHome = document.createElement("i");
    iconHome.classList.add("fa-solid", "fa-house"); // Icono de casa de Font Awesome
    linkHome.appendChild(iconHome);
    contentHome.appendChild(linkHome);

    // ---------- BUSCADOR ----------
    const contentBuscador = document.createElement("div");
    contentBuscador.classList.add("content_buscador");

    const contentLupa = document.createElement("div");
    contentLupa.classList.add("content_lupa");

    const iconLupa = document.createElement("i");
    iconLupa.classList.add("fa-solid", "fa-magnifying-glass"); // Icono de lupa de Font Awesome
    contentLupa.appendChild(iconLupa);

    const buscador = document.createElement("div");
    buscador.classList.add("buscador");

    const input = document.createElement("input");
    input.type = "search";
    input.classList.add("text_buscador");
    input.placeholder = "Buscar música, artistas...";

    buscador.appendChild(input);
    contentBuscador.appendChild(contentLupa);
    contentBuscador.appendChild(buscador);

    // ---------- PERFIL ----------
    const contentPerfil = document.createElement("div");
    contentPerfil.classList.add("content_perfil"); // Cambiado a content_perfil para estilos específicos

    const linkPerfil = document.createElement("a");
    linkPerfil.href = "#Perfil"; // Enlace al perfil del usuario
    linkPerfil.classList.add("icon_link");

    const iconPerfil = document.createElement("i");
    iconPerfil.classList.add("fa-solid", "fa-user"); // Icono de usuario de Font Awesome
    linkPerfil.appendChild(iconPerfil);
    contentPerfil.appendChild(linkPerfil);

    // ---------- LOGOUT (dinámico) ----------
    const contentLogout = document.createElement("div");
    contentLogout.classList.add("content_logout");

    if (estaAutenticado()) {
        const logoutBtn = document.createElement("button");
        logoutBtn.id = "btn-logout";
        logoutBtn.textContent = "Cerrar Sesión";
        logoutBtn.classList.add("btn-logout");
        logoutBtn.addEventListener("click", logout);
        contentLogout.appendChild(logoutBtn);
    }

    // Ensamblar todo
    contentHeader.appendChild(contentHome);
    contentHeader.appendChild(contentBuscador);
    contentHeader.appendChild(contentPerfil);
    contentHeader.appendChild(contentLogout);
    header.appendChild(contentHeader);

    // Acción al hacer click en el home
    linkHome.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = "#Home"; // Asegúrate de que sea #Home o #/
        router(document.getElementById("app"));
    });

    // Acción al hacer click en el perfil
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


