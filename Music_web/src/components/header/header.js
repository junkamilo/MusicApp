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
  linkHome.classList.add("icon_home");

  const svgHome = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgHome.setAttribute("width", "24");
  svgHome.setAttribute("height", "24");
  svgHome.setAttribute("fill", "#222");
  svgHome.setAttribute("viewBox", "0 0 24 24");

  const pathHome = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathHome.setAttribute("d", "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z");
  svgHome.appendChild(pathHome);
  linkHome.appendChild(svgHome);
  contentHome.appendChild(linkHome);

  // ---------- BUSCADOR ----------
  const contentBuscador = document.createElement("div");
  contentBuscador.classList.add("content_buscador");

  const contentLupa = document.createElement("div");
  contentLupa.classList.add("content_lupa");

  const svgNS = "http://www.w3.org/2000/svg";
  const svgLupa = document.createElementNS(svgNS, "svg");
  svgLupa.setAttribute("class", "img-lupa");
  svgLupa.setAttribute("width", "18");
  svgLupa.setAttribute("height", "18");
  svgLupa.setAttribute("fill", "#666");
  svgLupa.setAttribute("viewBox", "0 0 24 24");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", "M10,2A8,8,0,1,1,2,10,8,8,0,0,1,10,2m0-2a10,10,0,1,0,10,10A10,10,0,0,0,10,0Zm9.71,19.29-3.4-3.39a9.9,9.9,0,0,1-1.32,1.32l3.39,3.4a1,1,0,0,0,1.41-1.41Z");
  svgLupa.appendChild(path);
  contentLupa.appendChild(svgLupa);

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
  contentPerfil.classList.add("content_home");

  const linkPerfil = document.createElement("a");
  linkPerfil.href = "#";
  linkPerfil.classList.add("icon_home");

  const svgPerfil = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgPerfil.setAttribute("width", "24");
  svgPerfil.setAttribute("height", "24");
  svgPerfil.setAttribute("fill", "#222");
  svgPerfil.setAttribute("viewBox", "0 0 24 24");

  const pathPerfil = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathPerfil.setAttribute("d", "M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z");
  svgPerfil.appendChild(pathPerfil);
  linkPerfil.appendChild(svgPerfil);
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
    window.location.hash = "#/";
    router(document.getElementById("app"));
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


