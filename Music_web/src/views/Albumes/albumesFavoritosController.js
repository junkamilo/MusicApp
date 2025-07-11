import { renderAlbumesFavorito } from "../../components/EliminarFavorito/renderAlbumesFavoritos";

export const albumesFavoritosController = () => {
  const app = document.getElementById("app"); // O el id de tu contenedor principal
  if (!app) {
    console.error("Contenedor principal 'app' no encontrado.");
    return;
  }

  renderAlbumesFavorito(app);
};
