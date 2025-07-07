// generosFavoritos.js
import { AgregadoGenerosFavoritos } from "../../helpers/alerts.js";
import "./favoritos.css";

export const generosFavoritos = (genero_id, nombre_genero, onSuccess = null) => {
  const corazon = document.createElement("i");
  corazon.classList.add("fa-regular", "fa-heart", "corazon-icon");
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
      const response = await fetch("http://localhost:3000/generosMusicales/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ generoId: genero_id })
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error al agregar favorito:", result.message);
        return;
      }

      // Cambiar ícono visual
      corazon.classList.remove("fa-regular");
      corazon.classList.add("fa-solid", "activo");

      // Lanzar alerta desde alert.js
      AgregadoGenerosFavoritos(nombre_genero);

      if (typeof onSuccess === "function") {
        onSuccess();
      }

    } catch (error) {
      console.error("Error al enviar favorito:", error);
    }
  });

  return corazon;
};


