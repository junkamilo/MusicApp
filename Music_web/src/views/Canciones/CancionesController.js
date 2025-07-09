import { cardCancion } from "../../components/cardCancion/cardCancion";
import { contentCards } from "../../components/ContentCards/contentCards";


export const CancionesController = async () => {
  const generos = [
    { id: 1, containerId: "content_cancionRock" },
    { id: 2, containerId: "content_cancionPop" },
    { id: 3, containerId: "content_cancionUrbana" },
    { id: 4, containerId: "content_cancionVallenato" },
    { id: 5, containerId: "content_cancionPopular" },
    { id: 6, containerId: "content_cancionRegueton" },
  ];

  for (const genero of generos) {
    try {
      const request = await fetch(`http://localhost:3000/canciones/genero/${genero.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      });

      const { data } = await request.json();

      if (data.error) {
        console.error(`Error al obtener canciones del género ${genero.id}:`, data.message);
        continue;
      }

      const contentContainer = document.getElementById(genero.containerId);
      if (!contentContainer) continue;

      const cardsContainer = contentContainer.querySelector(".content_cards");
      if (!cardsContainer) continue;

      // Solo las 6 más populares
      contentCards(data, cardsContainer, cardCancion, 6);

    } catch (error) {
      console.error(`Error al obtener canciones del género ${genero.id}:`, error);
    }
  }
};
