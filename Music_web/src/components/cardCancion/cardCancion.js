import "./cardCancion.css";

export const cardCancion = (data = [], contenedor) => {
  if (!Array.isArray(data) || !contenedor) return;

  data.forEach(({ cancion_id, titulo_cancion, artista_cancion, imagen_album, favorito = false }) => {
    const card = document.createElement("div");
    card.classList.add("card_cancion");
    card.classList.add("card_cancion_innovadora"); // Clase para estilos modernos

    // Envoltura para la imagen de la canción/álbum
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("imagen_cancion_wrapper");
    const img = document.createElement("img");
    img.classList.add("imagen_cancion");
    img.src = imagen_album || "https://via.placeholder.com/140/8A2BE2/FFFFFF?text=Cancion"; // Marcador de posición
    img.alt = titulo_cancion;
    imgWrapper.appendChild(img);

    // Botón de Reproducción (superpuesto en la imagen)
    const playButton = document.createElement("button");
    playButton.classList.add("btn_play_cancion");
    playButton.innerHTML = '▶️'; // Icono de reproducción
    playButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que el clic en el botón redirija la tarjeta

        // 1. Mostrar reproductor
  const footer = document.getElementById("footerPlayer");
  footer.classList.remove("hidden");

  // 2. Cargar datos
  document.getElementById("playerCover").src = url_portada;
  document.getElementById("playerTitle").textContent = titulo_cancion;
  document.getElementById("playerArtist").textContent = nombre_artista;

  // 3. Reproducir
  const audio = document.getElementById("audioPlayer");
  audio.src = url_archivo_audio; // Esta URL debe estar completa
  audio.play();
      console.log(`Reproduciendo: ${titulo_cancion}`);
      // Lógica para reproducir la canción
    });
    imgWrapper.appendChild(playButton); // El botón de reproducción va dentro del wrapper de la imagen

    card.appendChild(imgWrapper);

    // Contenedor para el título de la canción y el artista
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info_cancion_container");

    const titulo = document.createElement("h3");
    titulo.classList.add("titulo_cancion");
    titulo.textContent = titulo_cancion;
    infoContainer.appendChild(titulo);

    const artista = document.createElement("p");
    artista.classList.add("artista_cancion");
    artista.textContent = artista_cancion;
    infoContainer.appendChild(artista);

    card.appendChild(infoContainer);

    // Botón de Favorito
    const botonFavorito = document.createElement("button");
    botonFavorito.classList.add("btn_favorito_cancion"); // Clase específica para el corazón de la canción
    botonFavorito.innerHTML = favorito ? "❤️" : "🤍";
    botonFavorito.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que el clic en el botón redirija la tarjeta
      favorito = !favorito;
      botonFavorito.innerHTML = favorito ? "❤️" : "🤍";
      console.log(`Canción ${titulo_cancion} ahora es favorita:`, favorito);
      // Lógica para el fetch
    });
    card.appendChild(botonFavorito);

    // Eventos de hover para la tarjeta
    card.addEventListener("mouseenter", () => {
      card.classList.add("card_cancion_hover");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("card_cancion_hover");
    });

    // Lógica de redirección para toda la tarjeta (excluyendo clics en botones)
    card.addEventListener("click", () => {
      if (cancion_id) {
        window.location.href = `#/canciones/${cancion_id}`;
        console.log(`Redirigiendo a: #/canciones/${cancion_id}`);
      } else {
        console.warn(`Canción ${titulo_cancion} no tiene un cancion_id para redireccionar.`);
      }
    });

    contenedor.appendChild(card);
  });
};