import { artistProfile } from "../../components/perfilArtista/artistProfile";


export const perfilArtistasController = (params) => {
  const idArtista = params.id;

  if (!idArtista) {
    console.error("Falta el ID del artista.");
    return;
  }

  requestAnimationFrame(() => {
    const contenedor = document.getElementById("main-content");

    if (!contenedor) {
      console.error("Falta el contenedor principal con ID 'mainContent'.");
      return;
    }

    artistProfile(idArtista, contenedor);
  });
};


