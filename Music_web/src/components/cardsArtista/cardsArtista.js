import "./cardsArtista.css";
export const cardsArtista = (data = [], contenedor) => {
  if (!Array.isArray(data) || !contenedor) return;

  data.forEach(({ nombre_artista, imagen_artista, favorito = false }) => {
    const card = document.createElement("div");
    card.classList.add("card_artista");

    // Imagen
    const img = document.createElement("img");
    img.classList.add("imagen_artista");
    img.src = imagen_artista || "./assets/default_artist.jpg";
    img.alt = nombre_artista;

    // Nombre
    const nombre = document.createElement("p");
    nombre.classList.add("nombre_artista");
    nombre.textContent = nombre_artista;

    // Tipo fijo
    const tipo = document.createElement("p");
    tipo.classList.add("tipo_artista");
    tipo.textContent = "Artista";

    // Botón de corazón
    const boton = document.createElement("button");
    boton.classList.add("btn_favorito");
    boton.innerHTML = favorito ? "❤️" : "🤍";

    boton.addEventListener("click", () => {
      favorito = !favorito;
      boton.innerHTML = favorito ? "❤️" : "🤍";
      console.log(`Artista ${nombre_artista} ahora es favorito:`, favorito);

      // Aquí podrías enviar un fetch si lo deseas
      // fetch("/api/favoritos", { method: "POST", body: JSON.stringify(...) });
    });

    // Ensamblar
    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(tipo);
    card.appendChild(boton);

    contenedor.appendChild(card);
  });
};
