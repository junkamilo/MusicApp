import { renderGenerosFavoritos } from "../../components/EliminarFavorito/renderGenerosFavoritos";

export const generosFavoritosController = async () => {
  const app = document.getElementById("app");
  if (!app) {
    console.error("❌ Error: No se encontró el contenedor principal.");
    return;
  }

  // Limpia el contenedor antes de renderizar
  app.innerHTML = "";

  await renderGenerosFavoritos(app);
};

