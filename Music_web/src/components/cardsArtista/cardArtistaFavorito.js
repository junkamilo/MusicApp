// cardsArtistaFavorito.js (SIN EL BOTÓN DE CORAZÓN)
import { eliminarArtistaFavorito } from "../EliminarFavorito/eliminarArtistaFavorito";
import "./cardArtistaFavoritos.css"; // Estilos específicos

// cardsArtistaFavorito.js
export const cardsArtistaFavorito = (data = [], contenedor) => {
  // ✅ Normalizamos el input a un array
  const artistas = Array.isArray(data) ? data : [data];

  console.log("Data recibida en cardsArtistaFavorito:", artistas);

  artistas.forEach(({ artista_id, nombre_artista, url_foto_artista }) => {
    console.log("Datos del artista:", {
  artista_id,
  nombre_artista,
  url_foto_artista
});

    const card = document.createElement("div");
    card.classList.add("card_artista_favorito", "card");

    // Imagen del artista (circular)
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("imagen_artista_favorito_wrapper");

    const img = document.createElement("img");
    img.classList.add("imagen_artista_favorito");

    const rutaImagen = url_foto_artista
      ? `http://localhost:3000/uploads${url_foto_artista.replace(/^\/+/, "/")}`
      : "https://via.placeholder.com/150";

    img.src = rutaImagen;
    img.alt = nombre_artista;
    imgWrapper.appendChild(img);

    // Info
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info_artista_favorito_container");

    const nombre = document.createElement("h3");
    nombre.classList.add("nombre_artista_favorito");
    nombre.textContent = nombre_artista;

    const tipo = document.createElement("p");
    tipo.classList.add("tipo_artista_favorito");
    tipo.textContent = "Artista";

    infoContainer.appendChild(nombre);
    infoContainer.appendChild(tipo);

    // Play
    const playIcon = document.createElement("button");
    playIcon.classList.add("play_icon_favorito");
    playIcon.innerHTML = '<i class="fa-solid fa-play"></i>';
    playIcon.setAttribute("title", "Reproducir artista");

    playIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(`Reproduciendo artista: ${nombre_artista}`);
    });

    // Eliminar
    const eliminarBtn = document.createElement("button");
    eliminarBtn.classList.add("eliminar_icon_favorito");
    eliminarBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    eliminarBtn.setAttribute("title", "Eliminar de favoritos");

    eliminarBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      eliminarArtistaFavorito(artista_id, nombre_artista, () => {
        card.remove();
      });
    });

    // Ensamblado
    card.appendChild(imgWrapper);
    card.appendChild(infoContainer);
    card.appendChild(playIcon);
    card.appendChild(eliminarBtn);

    card.addEventListener("mouseenter", () => {
      card.classList.add("card_artista_favorito_hover");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("card_artista_favorito_hover");
    });

    card.addEventListener("click", () => {
      if (artista_id) {
        window.location.href = `#/artistas/${artista_id}`;
      }
    });

    contenedor.appendChild(card);
  });
};



