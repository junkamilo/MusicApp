import "./cardCancion.css";

export const cardCancion = (data = [], contenedor) => {
  if (!Array.isArray(data) || !contenedor) return;

  console.log("🎧 Data recibida en cardCancion:", data);
  data.forEach(
    ({
      cancion_id,
      titulo_cancion,
      artista_cancion,
      url_portada_album,
      url_archivo_audio,
      favorito = false,
    }) => {
      const card = document.createElement("div");
      card.classList.add("card_cancion", "card_cancion_innovadora");

      // Envoltura para la imagen de la canción/álbum
      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("imagen_cancion_wrapper");

      const img = document.createElement("img");
      img.classList.add("imagen_cancion");
      img.src =
        url_portada_album ||
        "https://via.placeholder.com/140/8A2BE2/FFFFFF?text=Cancion";
      img.alt = titulo_cancion;
      imgWrapper.appendChild(img);

      // Botón de Reproducción
      const playButton = document.createElement("button");
      playButton.classList.add("btn_play_cancion");
      playButton.innerHTML = "▶️";
      playButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita redirección

        // Mostrar el reproductor
        const footer = document.getElementById("footerPlayer");
        footer.classList.remove("hidden");

        // Cargar datos en el reproductor
        document.getElementById("playerCover").src = img.src;
        document.getElementById("playerTitle").textContent = titulo_cancion;
        document.getElementById("playerArtist").textContent = artista_cancion;

        // Reproducir audio
        const audio = document.getElementById("audioPlayer");
        const host = window.location.hostname;
        if (!url_archivo_audio) {
          console.error(
            "❌ No se encontró la URL del audio para:",
            titulo_cancion
          );
          alert(
            `No se puede reproducir "${titulo_cancion}" porque no tiene archivo de audio asignado.`
          );
          return;
        }

        const audioURL = `http://${host}:3000/uploads${encodeURI(
          url_archivo_audio
        )}`;
        console.log("🎧 URL audio:", audioURL);

        audio.src = audioURL;
        audio.onerror = () => {
          console.error("❌ Error al cargar el audio:", audio.src);
          alert(
            "Error al cargar el archivo de audio. Verifica que exista en el servidor."
          );
        };
        audio.play();

        console.log(`▶️ Reproduciendo: ${titulo_cancion}`);
      });
      imgWrapper.appendChild(playButton);
      card.appendChild(imgWrapper);

      // Info título y artista
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

      // Botón de favorito
      const botonFavorito = document.createElement("button");
      botonFavorito.classList.add("btn_favorito_cancion");
      botonFavorito.innerHTML = favorito ? "❤️" : "🤍";
      botonFavorito.addEventListener("click", (e) => {
        e.stopPropagation();
        favorito = !favorito;
        botonFavorito.innerHTML = favorito ? "❤️" : "🤍";
        console.log(`Favorito: ${titulo_cancion}`, favorito);
      });
      card.appendChild(botonFavorito);

      // Hover efecto
      card.addEventListener("mouseenter", () => {
        card.classList.add("card_cancion_hover");
      });
      card.addEventListener("mouseleave", () => {
        card.classList.remove("card_cancion_hover");
      });

      // Redirección
      card.addEventListener("click", () => {
        if (cancion_id) {
          window.location.href = `#/canciones/${cancion_id}`;
        }
      });

      contenedor.appendChild(card);
    }
  );
};
