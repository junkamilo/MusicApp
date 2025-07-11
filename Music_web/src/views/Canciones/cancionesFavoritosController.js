import { renderCancionesFavoritas } from "../../components/EliminarFavorito/renderCancionesFavoritas";

export const cancionesFavoritosController = () => {
      const app = document.getElementById("app"); // O el id de tu contenedor principal
  if (!app) {
    console.error("Contenedor principal 'app' no encontrado.");
    return;
  }

  renderCancionesFavoritas(app);
}