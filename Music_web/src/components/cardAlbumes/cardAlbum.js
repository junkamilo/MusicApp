import "./cardAlbum.css";

export const cardAlbum = (data = [], contenedor) => {
  if (!Array.isArray(data) || !contenedor) return;

  data.forEach(({ album_id, titulo_album, imagen_album, nombre_artista, favorito = false }) => {
    // La card principal será un div para tener más control sobre el diseño
    const card = document.createElement("div");
    card.classList.add("card_album");
    card.classList.add("card_album_innovadora"); // Nueva clase para los estilos modernos

    // Contenedor para la imagen del álbum (portada)
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("imagen_album_wrapper");
    const img = document.createElement("img");
    img.classList.add("imagen_album");
    img.src = imagen_album || "./assets/default_artist.jpg"; // Placeholder para álbum
    img.alt = titulo_album;
    imgWrapper.appendChild(img);
    card.appendChild(imgWrapper);

    // Contenedor para el título del álbum y el nombre del artista
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info_album_container");

    const titulo = document.createElement("h3");
    titulo.classList.add("titulo_album");
    titulo.textContent = titulo_album;
    infoContainer.appendChild(titulo);

    // Nombre del artista para el álbum (opcional, pero mejora el contexto)
    if (nombre_artista) {
      const artista = document.createElement("p");
      artista.classList.add("nombre_artista_album");
      artista.textContent = nombre_artista;
      infoContainer.appendChild(artista);
    }

    card.appendChild(infoContainer);

    // --- Botón de corazón ---
    const botonFavorito = document.createElement("button");
    botonFavorito.classList.add("btn_favorito_album"); // Clase específica para el corazón del álbum
    botonFavorito.innerHTML = favorito ? "❤️" : "🤍";

    botonFavorito.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que el clic en el corazón active la redirección de la card
      favorito = !favorito;
      botonFavorito.innerHTML = favorito ? "❤️" : "🤍";
      console.log(`Álbum ${titulo_album} ahora es favorito:`, favorito);
      // Aquí podrías enviar un fetch si lo deseas
    });
    card.appendChild(botonFavorito);

    // Eventos de hover para los estilos
    card.addEventListener("mouseenter", () => {
      card.classList.add("card_album_hover");
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("card_album_hover");
    });

    // Lógica de redirección al hacer clic en la card
    card.addEventListener("click", () => {
      if (album_id) {
        window.location.href = `#/albumes/${album_id}`;
        console.log(`Redirigiendo a: #/albumes/${album_id}`);
      } else {
        console.warn(`Álbum ${titulo_album} no tiene un album_id para redireccionar.`);
      }
    });

    contenedor.appendChild(card);
  });
};