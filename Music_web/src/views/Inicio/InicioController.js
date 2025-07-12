import { generosFavoritos } from "../../components/Agregar Favoritos/Favoritos";
import { cardAlbum } from "../../components/cardAlbumes/cardAlbum";
import { cardCancion } from "../../components/cardCancion/cardCancion";
import { cardGenero } from "../../components/cardGenero/cardGenero";
import { cardsArtista } from "../../components/cardsArtista/cardsArtista";
import { contentCards } from "../../components/ContentCards/contentCards";
import { activarBuscadorGlobal } from "../../helpers/buscador";

export const inicioController = async () => {
  //hacemos peticion  a los géneros musicales
  try {
    const request = await fetch("http://localhost:3000/generosMusicales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    console.log(request);

    const { data, code, message } = await request.json();

    if (data.error) {
      console.error("Error al obtener los géneros musicales:", data.message);
      return;
    }

    const contentGenerosMusical = document.getElementById(
      "content_generoMusicales"
    );
    if (!contentGenerosMusical) return;

    // Contenedor específico donde deben ir las cards
    const contenedorCards =
      contentGenerosMusical.querySelector(".content_cards");
    if (!contenedorCards) return;

    // Recorremos los géneros
    contentCards(data, contenedorCards, cardGenero, 6);

  } catch (error) {
    console.error("Error al obtener los géneros musicales:", error);
  }

  //listamos los artistas destacados
  try {
    const request = await fetch("http://localhost:3000/artistas/destacados", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    console.log(request);

    const { data, code, message } = await request.json();

    if (data.error) {
      console.error("Error al obtener los artitas destacados :", data.message);
      return;
    }

    const contentGenerosMusical = document.getElementById(
      "content_ArtistasMusicales"
    );
    if (!contentGenerosMusical) return;

    // Contenedor específico donde deben ir las cards
    const contenedorCards =
      contentGenerosMusical.querySelector(".content_cards");
    if (!contenedorCards) return;

    const verMas = contentGenerosMusical.querySelector(".ver-mas");

    contenedorCards.innerHTML = "";

    // Recorremos los artistas
    cardsArtista(data.slice(0,6), contenedorCards);
    
  } catch (error) {
    console.error("Error al obtener los artistas destacados:", error);
  }

  //listamos los albumes
  try {
    const request = await fetch("http://localhost:3000/albumes/populares", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    console.log(request);

    const { data, code, message } = await request.json();

    if (data.error) {
      console.error("Error al obtener los géneros musicales:", data.message);
      return;
    }

    const contentGenerosMusical = document.getElementById("content_Albumes");
    if (!contentGenerosMusical) return;

    // Contenedor específico donde deben ir las cards
    const contenedorCards =
      contentGenerosMusical.querySelector(".content_cards");
    if (!contenedorCards) return;

    const verMas = contentGenerosMusical.querySelector(".ver-mas");

    // Recorremos los albumes
    cardAlbum(data.slice(0,6), contenedorCards);
  } catch (error) {
    console.error("Error al obtener los géneros musicales:", error);
  }

  //listamos las canciones
  try {
    const request = await fetch("http://localhost:3000/canciones/populares", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    console.log(request);

    const { data, code, message } = await request.json();

    if (data.error) {
      console.error("Error al obtener los géneros musicales:", data.message);
      return;
    }

    const contentGenerosMusical = document.getElementById("content_canciones");
    if (!contentGenerosMusical) return;

    // Contenedor específico donde deben ir las cards
    const contenedorCards =
      contentGenerosMusical.querySelector(".content_cards");
    if (!contenedorCards) return;

    const verMas = contentGenerosMusical.querySelector(".ver-mas");

    // Recorremos las canciones
    cardCancion(data.slice(0,6), contenedorCards);

  } catch (error) {
    console.error("Error al obtener las canciones:", error);
  }

    activarBuscadorGlobal([
    "content_generoMusicales",
    "content_ArtistasMusicales",
    "content_Albumes",
    "content_canciones",
  ]);
};
