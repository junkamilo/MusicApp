import "./contentCards.css";
import { cardGenero } from '../cardGenero/cardGenero.js';
import { cardsArtista } from '../cardsArtista/cardsArtista.js';
import { cardAlbum } from '../cardAlbumes/cardAlbum.js';
import { cardCancion } from "../cardCancion/cardCancion.js";

export const contentCards = (data = [], contenedor, cardGenerator, limit = 6) => {
  // Valida que los parámetros sean correctos.
  if (!Array.isArray(data)) {
    console.error('Error: "data" debe ser un array.');
    return;
  }
  if (!(contenedor instanceof HTMLElement)) {
    console.error('Error: "contenedor" debe ser un elemento HTML válido.');
    return;
  }
  if (typeof cardGenerator !== 'function') {
    console.error('Error: "cardGenerator" debe ser una función.');
    return;
  }

  // Limpia el contenido actual del contenedor.
  contenedor.innerHTML = '';

  // Limita los datos a mostrar según el parámetro 'limit'.
  const dataToShow = data.slice(0, limit);

  // Itera sobre los datos y genera cada tarjeta.
  dataToShow.forEach(item => {
    try {
      cardGenerator([item], contenedor);
    } catch (error) {
      console.error(`Error al generar tarjeta con ${cardGenerator.name}:`, item, error);
    }
  });
};