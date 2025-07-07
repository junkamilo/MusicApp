import "./headerFavoritos.css";

export const headerFavoritos = ({
  tipo = "Playlist",            // Ej: Playlist, Álbum, Artistas, Géneros
  titulo = "Tus me gusta",      // Título grande
  usuario = "Usuario",          // Nombre del usuario
  cantidad = 0,                 // Cantidad de ítems
  tipoItem = "canciones",       // Texto luego del número
  avatarUrl = "./assets/perfil_default.png"  // Avatar dinámico
}) => {
  const container = document.createElement("div");
  container.classList.add("container_favoritos");

  const header = document.createElement("div");
  header.classList.add("header_favoritos");

  const main = document.createElement("div");
  main.classList.add("main_favoritos");

  // ---------- Logo SVG (corazón o el que desees) ----------
  const logo = document.createElement("div");
  logo.classList.add("logo_favoritos");

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "64");
  svg.setAttribute("height", "64");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "white");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z");

  svg.appendChild(path);
  logo.appendChild(svg);

  // ---------- Texto pequeño ----------
  const tituloPequeno = document.createElement("div");
  tituloPequeno.classList.add("titulo_favoritos");
  tituloPequeno.textContent = tipo;

  // ---------- Texto grande ----------
  const tituloGrande = document.createElement("div");
  tituloGrande.classList.add("titulo_tusMegustas");
  tituloGrande.textContent = titulo;

  // ---------- Perfil y conteo ----------
  const logoPerfil = document.createElement("div");
  logoPerfil.classList.add("logo_perfil");

  const imgPerfil = document.createElement("img");
  imgPerfil.classList.add("avatar_favoritos");
  imgPerfil.src = avatarUrl;
  imgPerfil.alt = "Perfil";

  const conteo = document.createElement("span");
  conteo.classList.add("conteo_favoritos");
  conteo.textContent = `${usuario} • ${cantidad} ${tipoItem}`;

  logoPerfil.appendChild(imgPerfil);
  logoPerfil.appendChild(conteo);

  // ---------- Ensamblar ----------
  main.appendChild(logo);
  main.appendChild(tituloPequeno);
  main.appendChild(tituloGrande);
  main.appendChild(logoPerfil);

  header.appendChild(main);
  container.appendChild(header);

  return container;
};
