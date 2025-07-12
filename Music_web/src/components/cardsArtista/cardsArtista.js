import { AgregadoArtistasFavoritos } from "../../helpers/alerts";
import "./cardsArtista.css";

export const cardsArtista = (data = [], contenedor) => {
  if (!Array.isArray(data) || !contenedor) return;

  data.forEach(({ artista_id, nombre_artista, imagen_artista, favorito = false }) => {
    const card = document.createElement("div");
    card.classList.add("card_artista", "card_artista_innovadora", "card");

    // Imagen del artista
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("imagen_artista_wrapper");
    const img = document.createElement("img");
    img.classList.add("imagen_artista");
    img.src = imagen_artista || "./assets/default_artist.jpg";
    img.alt = nombre_artista;
    imgWrapper.appendChild(img);

    // Contenedor para nombre y tipo
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info_artista_container");

    const nombre = document.createElement("h3");
    nombre.classList.add("nombre_artista");
    nombre.textContent = nombre_artista;

    const tipo = document.createElement("p");
    tipo.classList.add("tipo_artista");
    tipo.textContent = "Artista";

    infoContainer.appendChild(nombre);
    infoContainer.appendChild(tipo);

    // Botón de corazón
    const boton = document.createElement("button");
    boton.classList.add("btn_favorito");
    boton.innerHTML = favorito ? "❤️" : "🤍";

    boton.addEventListener("click", async (e) => {
      e.stopPropagation();

      const token = localStorage.getItem("accessToken");
      if (!token) {
        window.location.hash = "#Login";
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/artistas/favoritos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ artistaId: artista_id }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error("Error al agregar favorito:", result.message);
          return;
        }

        // Cambiar visualmente
        favorito = !favorito;
        boton.innerHTML = favorito ? "❤️" : "🤍";

        // Alerta visual
        AgregadoArtistasFavoritos(nombre_artista); // opcional: crear una alerta personalizada si prefieres

      } catch (error) {
        console.error("Error al enviar favorito:", error);
      }
    });

    // Ensamblar la card
    card.appendChild(imgWrapper);
    card.appendChild(infoContainer);
    card.appendChild(boton);

    card.addEventListener("mouseenter", () => {
      card.classList.add("card_artista_hover");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("card_artista_hover");
    });

    card.addEventListener("click", () => {
      if (artista_id) {
        window.location.href = `#/artistas/${artista_id}`;
      }
    });

    contenedor.appendChild(card);
  });
};