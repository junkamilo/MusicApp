import { AgregadoGenerosFavoritos } from "../../helpers/alerts";
import "./favoritos.css";

export const artistasFavoritos = (artista_id, nombre_artista, favorito = false, onSuccess = null) => {
  const corazon = document.createElement("button");
  corazon.classList.add("btn_favorito");
  corazon.innerHTML = favorito ? "❤️" : "🤍";
  corazon.setAttribute("title", "Agregar a favoritos");

  corazon.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.hash = "#Login";
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/artistas/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ artistaId: artista_id })
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error al agregar artista favorito:", result.message);
        return;
      }

      favorito = !favorito;
      corazon.innerHTML = favorito ? "❤️" : "🤍";

      AgregadoGenerosFavoritos(nombre_artista);

      if (typeof onSuccess === "function") {
        onSuccess();
      }

    } catch (error) {
      console.error("Error al agregar artista favorito:", error);
    }
  });

  return corazon;
};