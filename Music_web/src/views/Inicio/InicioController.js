import { generosFavoritos } from "../../components/Agregar Favoritos/Favoritos";

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
    data.slice(0, 6).forEach(({ genero_id, nombre_genero }) => {
      // Creamos un elemento div para cada género musical
      const card = document.createElement("a");
      //agregamos estilos a la card
      card.classList.add("ver-mas");
      // Asignamos un enlace a la card
      card.setAttribute("href", `#/generosMusicales/${genero_id}`);
      // Asignamos las clases y el contenido
      card.classList.add("card_generoMusical");
      // Asignamos el contenido del género musical
      card.textContent = nombre_genero;

      const favorito = generosFavoritos(genero_id, nombre_genero);

      card.appendChild(favorito);
      contenedorCards.appendChild(card);
    });
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

    // Recorremos los artistas
    data.slice(0, 6).forEach(({ artista_id, nombre_artista }) => {
      // Creamos un elemento div para cada género musical
      const card = document.createElement("a");
      // Asignamos un enlace a la card
      card.setAttribute("href", `#/artistas/${artista_id}`);
      // Asignamos las clases y el contenido
      card.classList.add("card_artista");
      // Asignamos el nombre del artista
      card.textContent = nombre_artista;

      //agregamos la card al contenedor
      contenedorCards.appendChild(card);
    });
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
    data.slice(0, 6).forEach(({ album_id, titulo_album }) => {
      // Creamos un elemento a para los albumes
      const card = document.createElement("a");
      // Asignamos un enlace a la card
      card.setAttribute("href", `#/albumes/${album_id}`);
      // Asignamos las clases y el contenido
      card.classList.add("card_album");
      // Asignamos el contenido del album
      card.textContent = titulo_album;

      //agregamos la card al contenedor
      contenedorCards.appendChild(card);
    });
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
    data.slice(0, 6).forEach(({ titulo_cancion, descripcion }) => {
      // Creamos un elemento div para cada género musical
      const card = document.createElement("a");
      // Asignamos un enlace a la card
      card.setAttribute("href", `#/canciones/${titulo_cancion}`);
      // Asignamos las clases y el contenido
      card.classList.add("card_cancion");
      // Asignamos el contenido de la canción
      card.textContent = titulo_cancion;

      //agregamos la card al contenedor
      contenedorCards.appendChild(card);
    });
  } catch (error) {
    console.error("Error al obtener las canciones:", error);
  }
};
