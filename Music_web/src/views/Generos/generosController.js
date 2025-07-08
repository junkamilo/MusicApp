import { cardGenero } from "../../components/cardGenero/cardGenero";


export const generosController = async () => {
  try {
    const request = await fetch("http://localhost:3000/generosMusicales", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });

    const { data } = await request.json();

    if (data.error) {
      console.error("Error al obtener los géneros musicales:", data.message);
      return;
    }

    const contentGenerosMusical = document.getElementById('content_generoMusicales');
    if (!contentGenerosMusical) return;

    // ✅ Aquí seleccionamos el contenedor donde deben ir las cards
    const contenedorCards = contentGenerosMusical.querySelector('.content_cards');

    // Ver más (si lo vas a usar después)
    const verMas = contentGenerosMusical.querySelector('.ver-mas');

    // ✅ Aquí insertamos las tarjetas en el contenedor correcto
    cardGenero(data.slice(0, 6), contenedorCards);

  } catch (error) {
    console.error("Error al obtener los géneros musicales:", error);
  }
};




