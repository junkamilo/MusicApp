import { generosFavoritos } from "../Agregar Favoritos/Favoritos.js";
import "./cardGenero.css";


export const cardGenero = (data = [], contenedor) => {
  if (!Array.isArray(data) || !contenedor) retur-n;

  data.forEach(({ nombre_genero, genero_id, favorito = false }) => {
    const card = document.createElement("div");
    card.classList.add("card_generoMusical");
    card.classList.add("card_generoMusical_innovadora");

    const nameContainer = document.createElement("div");
    nameContainer.classList.add("genero_nombre_container");

    const nombre = document.createElement("h3");
    nombre.classList.add("nombre_genero");
    nombre.textContent = nombre_genero;
    nameContainer.appendChild(nombre);

    card.appendChild(nameContainer);

    // --- Botón de corazón funcional ---
    const corazon = generosFavoritos(genero_id, nombre_genero, favorito);
    card.appendChild(corazon);

    // Redirección al hacer clic en la card
    card.addEventListener("click", () => {
      if (genero_id) {
        window.location.href = `#/generosMusicales/${genero_id}`;
        console.log(`Redirigiendo a: #/generosMusicales/${genero_id}`);
      } else {
        console.warn(`Género ${nombre_genero} no tiene un genero_id para redireccionar.`);
      }
    });

    // Efecto hover
    card.addEventListener("mouseenter", () => {
      card.classList.add("card_generoMusical_hover");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("card_generoMusical_hover");
    });

    contenedor.appendChild(card);
  });
};
