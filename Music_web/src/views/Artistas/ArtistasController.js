import { cardsArtista } from "../../components/cardsArtista/cardsArtista";

export const artistasController = () => {
  const listar = async () => {
    const generos = [
    { id: 1, contenedorId: 'content_Artistasrock' },
    { id: 2, contenedorId: 'content_Artistaspop' },
    { id: 3, contenedorId: 'content_ArtistasmusicaUrbana' },
    { id: 4, contenedorId: 'content_Artistasvallenato' },
    { id: 5, contenedorId: 'content_ArtistasmusicaPopular' },
    { id: 6, contenedorId: 'content_Artistasregueton' }
  ];

  generos.forEach(async ({ id, contenedorId }) => {
    try {
      const request = await fetch(`http://localhost:3000/artistas/genero/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      });

      const { data } = await request.json();

      if (!data || data.error) {
        console.error(`Error al obtener los artistas del género ${id}:`, data?.message || "Desconocido");
        return;
      }

      const contenedor = document.getElementById(contenedorId);
      if (!contenedor) return;

      const cardsWrapper = contenedor.querySelector('.content_cards');
      if (!cardsWrapper) return;

      // Usamos el componente que ya creaste
      cardsArtista(data.slice(0, 6), cardsWrapper);

    } catch (error) {
      console.error(`Error al obtener artistas para el género ${id}:`, error);
    }
  });
  };

  listar();
}