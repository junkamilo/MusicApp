import { headerFavoritos } from "../../components/headerFavoritos/headerFavoritos.js";
import { error } from "../../helpers/alerts.js";

export const generosFavoritosController = async () =>{
    const token = localStorage.getItem("accessToken");
    const app = document.getElementById("app");

  // Limpia el contenedor por si acaso
  app.innerHTML = "";

    if (!token) {
    window.location.hash = "#Login";
    return;
  }
try {
    const response = await fetch("http://localhost:3000/generosMusicales/favoritos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

    const { data } = await response.json();

    if (!response.ok) {
      error({ message: "Error al obtener géneros favoritos" });
      return;
    }

    // HEADER
    const header = headerFavoritos({
      tipo: "Géneros",
      titulo: "Tus géneros favoritos",
      usuario: "Juan Camilo",
      cantidad: data.length,
      tipoItem: "géneros",
      avatarUrl: "./assets/perfil_default.png"
    });

    app.appendChild(header);

    // LISTA DE CARDS
    const lista = document.createElement("div");
    lista.classList.add("lista_generos_favoritos");

    data.forEach(({ genero_id,nombre_genero,}) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("a");
        //agregamos estilos a la card
        card.classList.add("card_genero_favorito");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/generosMusicales/${genero_id}`);
        
        const nombre = document.createElement("p");
        nombre.textContent = nombre_genero;        

        card.appendChild(nombre);
        lista.appendChild(card);
      });

    app.appendChild(lista);

  } catch (err) {
    console.error("Error al cargar géneros favoritos:", err);
    error({ message: "No se pudieron cargar tus géneros favoritos." });
  }
}

