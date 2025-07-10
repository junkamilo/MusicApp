import { albumProfile } from "../../components/perfilAlbum/albumProfile";

export const AlbumesMusicalesController = (params) => {
  console.log("✅ Usando el controlador moderno AlbumesMusicalesController");
  const idAlbum = params.id;

  if (!idAlbum) {
    console.error("Falta el ID del álbum.");
    return;
  }

  requestAnimationFrame(() => {
    const contenedor = document.getElementById("album-profile-view");

    if (!contenedor) {
      console.error("No se encontró el contenedor 'album-profile-view' en el DOM");
      return;
    }

    albumProfile(idAlbum, contenedor);
  });
};
