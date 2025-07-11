
import { cardAlbum } from "../../components/cardAlbumes/cardAlbum.js";
import { contentCards } from "../../components/ContentCards/contentCards.js";

export const AlbumesController = async () => {
  const generos = [
    { id: 1, containerId: "content_Albumrock" },
    { id: 2, containerId: "content_Albumpop" },
    { id: 3, containerId: "content_AlbumMusicaUrbana" },
    { id: 4, containerId: "content_Albumvallenato" },
    { id: 5, containerId: "content_AlbumMusicaPopular" },
    { id: 6, containerId: "content_Albumregueton" },
  ];

  for (const genero of generos) {
    try {
      const response = await fetch(`http://localhost:3000/albumes/genero/${genero.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      });

      const { data } = await response.json();

      if (data.error) {
        console.error(`Error al obtener álbumes del género ${genero.id}:`, data.message);
        continue;
      }

      const contentContainer = document.getElementById(genero.containerId);
      if (!contentContainer) continue;

      // Llama al componente reutilizable para renderizar
      contentCards(data, contentContainer, cardAlbum, 6);

    } catch (error) {
      console.error(`Error al obtener álbumes del género ${genero.id}:`, error);
    }
  }
};
