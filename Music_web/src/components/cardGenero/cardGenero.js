import { generosFavoritos } from "../Agregar Favoritos/Favoritos.js";
import "./cardGenero.css";

/**
 * Renderiza cards de géneros musicales.
 * @param {Array} data - Lista de géneros con: nombre_genero, genero_id, favorito.
 * @param {HTMLElement} contenedor - Contenedor donde se insertan las cards.
 * @param {boolean} isFavoritePage - Indica si se está en la vista de favoritos.
 * @param {Function} onDeleteCallback - Callback que se ejecuta al eliminar un género favorito.
 */
export const cardGenero = (data = [], contenedor, isFavoritePage = false, onDeleteCallback = null) => {
  if (!Array.isArray(data) || !contenedor) return;

  data.forEach(({ nombre_genero, genero_id, favorito = false }) => {
    const card = document.createElement("div");
    card.classList.add("card_generoMusical", "card");

    const nameContainer = document.createElement("div");
    nameContainer.classList.add("genero_nombre_container");

    const nombre = document.createElement("h3");
    nombre.classList.add("nombre_genero");
    nombre.textContent = nombre_genero;
    nameContainer.appendChild(nombre);

    card.appendChild(nameContainer);

    // --- Acción: Corazón o Botón Eliminar ---
    if (isFavoritePage && typeof onDeleteCallback === "function") {
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn_accion_card_genero", "btn_eliminar_genero");
      btnEliminar.setAttribute("title", "Eliminar este género favorito");

      // Ícono trash (usando <i class="fa-solid fa-trash">)
      const icono = document.createElement("i");
      icono.classList.add("fa-solid", "fa-trash");

      btnEliminar.appendChild(icono);

      btnEliminar.addEventListener("click", async (e) => {
        e.stopPropagation(); // Evita que dispare la redirección
        await onDeleteCallback(genero_id, nombre_genero);
      });

      const btnWrapper = document.createElement("div");
      btnWrapper.classList.add("wrapper_card_eliminar");
      btnWrapper.appendChild(btnEliminar);
      card.appendChild(btnWrapper);
    } else {
      const corazon = generosFavoritos(genero_id, nombre_genero, favorito);
      corazon.classList.add("btn_accion_card_genero");
      card.appendChild(corazon);
    }

    // Redirección al hacer clic en la card
    card.addEventListener("click", () => {
      if (genero_id) {
        window.location.href = `#/generosMusicales/${genero_id}`;
        console.log(`Redirigiendo a: #/generosMusicales/${genero_id}`);
      } else {
        console.warn(`Género ${nombre_genero} no tiene un genero_id para redireccionar.`);
      }
    });

    // Hover visual
    card.addEventListener("mouseenter", () => card.classList.add("card_generoMusical_hover"));
    card.addEventListener("mouseleave", () => card.classList.remove("card_generoMusical_hover"));

    contenedor.appendChild(card);
  });
};
