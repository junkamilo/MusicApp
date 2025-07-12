import { cardsArtista } from "../../components/cardsArtista/cardsArtista";
import { activarBuscadorGlobal } from "../../helpers/buscador";


export const artistasController = () => {
  const listar = async () => {
    const generos = [
      { id: 1, contenedorId: "content_Artistasrock" },
      { id: 2, contenedorId: "content_Artistaspop" },
      { id: 3, contenedorId: "content_ArtistasmusicaUrbana" },
      { id: 4, contenedorId: "content_Artistasvallenato" },
      { id: 5, contenedorId: "content_ArtistasmusicaPopular" },
      { id: 6, contenedorId: "content_Artistasregueton" },
    ];

    for (const { id, contenedorId } of generos) {
      try {
        const request = await fetch(`http://localhost:3000/artistas/genero/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        });

        const { data } = await request.json();

        if (!data || data.error) {
          console.error(`Error al obtener los artistas del género ${id}:`, data?.message || "Desconocido");
          continue;
        }

        const contenedor = document.getElementById(contenedorId);
        if (!contenedor) continue;

        const cardsWrapper = contenedor.querySelector(".content_cards");
        if (!cardsWrapper) continue;

        cardsArtista(data.slice(0, 6), cardsWrapper);
      } catch (error) {
        console.error(`Error al obtener artistas para el género ${id}:`, error);
      }
    }

    // ✅ Activa buscador sobre todos los contenedores
    activarBuscadorGlobal([
      "content_Artistasrock",
      "content_Artistaspop",
      "content_ArtistasmusicaUrbana",
      "content_Artistasvallenato",
      "content_ArtistasmusicaPopular",
      "content_Artistasregueton"
    ]);
  };

  listar();
};
