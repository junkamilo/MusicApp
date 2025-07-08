// cardsArtistaFavorito.js (SIN EL BOTÓN DE CORAZÓN)
import { eliminarArtistaFavorito } from "../EliminarFavorito/eliminarArtistaFavorito";
import "./cardArtistaFavoritos.css"; // Nuevo archivo CSS para estos estilos específicos

export const cardsArtistaFavorito = (data = [], contenedor) => {
  if (!Array.isArray(data) || !contenedor) return;

  data.forEach(({ artista_id, nombre_artista, imagen_artista }) => {
    // Ya     no necesitamos 'favorito' aquí
    const card = document.createElement("div");
    card.classList.add("card_artista_favorito"); // Clase específica para estas cards

    // Imagen del artista (circular)
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("imagen_artista_favorito_wrapper");
    const img = document.createElement("img");
    img.classList.add("imagen_artista_favorito");
    img.src = imagen_artista || "./assets/default_artist.jpg";
    img.alt = nombre_artista;
    imgWrapper.appendChild(img);

    // Contenedor para nombre y tipo
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

    // Icono de "Play" (aparece al hacer hover)
    const playIcon = document.createElement("button");
    playIcon.classList.add("play_icon_favorito");
    playIcon.innerHTML = '<i class="fa-solid fa-play"></i>';
    playIcon.setAttribute("title", "Reproducir artista");

    playIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que el clic en el play active el evento de la card
      console.log(`Reproduciendo artista: ${nombre_artista}`);
      // Lógica para reproducir el artista
    });

    const eliminarBtn = document.createElement("button");
    eliminarBtn.classList.add("eliminar_icon_favorito");
    eliminarBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    eliminarBtn.setAttribute("title", "Eliminar de favoritos");

    eliminarBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que se active el clic de la card
      eliminarArtistaFavorito(artista_id, nombre_artista, () => {
        // Si se eliminó con éxito, quita la card del DOM
        card.remove();
      });
    });

    // Ensamblar la card
    card.appendChild(imgWrapper);
    card.appendChild(infoContainer);
    card.appendChild(playIcon); // Solo el botón de play
    card.appendChild(eliminarBtn);

    // Eventos de hover para la card (para mostrar/ocultar el playIcon)
    card.addEventListener("mouseenter", () => {
      card.classList.add("card_artista_favorito_hover");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("card_artista_favorito_hover");
    });

    // Evento de clic en la card para navegar
    card.addEventListener("click", () => {
      if (artista_id) {
        window.location.href = `#/artistas/${artista_id}`;
      }
    });

    contenedor.appendChild(card);
  });
};
