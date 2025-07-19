// components/createAlbum/createAlbum.js

import { error, success } from "../../helpers/alerts";
import { estaAutenticado } from "../../helpers/auth";
import "./createAlbum.css"; // Asegúrate de tener este archivo CSS

export const createAlbum = (appContainer) => {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const artistaId = user?.artista_id;

  if (!token || !artistaId) {
    error({
      message: "Debes iniciar sesión como artista para crear un álbum.",
    });
    window.location.hash = "#/login";
    return;
  }

  const app = document.getElementById("app");
  app.innerHTML = ""; // Limpia contenido anterior

  const form = document.createElement("form");
  form.classList.add("crear_album_form");

  const titleGroup = createInputGroupHTML("text", "albumTitle", "Título del Álbum", true);
  const dateGroup = createInputGroupHTML("date", "albumDate", "Fecha de Lanzamiento", true);
  const descriptionGroup = createInputGroupHTML("textarea", "albumDescription", "Descripción");

  const portadaLabel = document.createElement("label");
  portadaLabel.textContent = "Portada del Álbum";
  const portadaInput = document.createElement("input");
  portadaInput.type = "file";
  portadaInput.accept = "image/*";
  portadaInput.required = true;
  portadaLabel.appendChild(portadaInput);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Crear Álbum";

  form.appendChild(titleGroup);
  form.appendChild(dateGroup);
  form.appendChild(descriptionGroup);
  form.appendChild(portadaLabel);
  form.appendChild(submitButton);
  app.appendChild(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.getElementById("albumTitle").value.trim();
    const fecha = document.getElementById("albumDate").value;
    const descripcion = document.getElementById("albumDescription").value.trim();
    const portadaFile = portadaInput.files[0];

    if (!titulo || !fecha || !portadaFile) {
      error({ message: "Todos los campos son obligatorios." });
      return;
    }

    try {
      const crearAlbumRes = await fetch("http://localhost:3000/albumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          fecha_lanzamiento: fecha,
          descripcion,
          url_portada: null,
        }),
      });

      const crearAlbumData = await crearAlbumRes.json();
      if (!crearAlbumRes.ok || crearAlbumData.error) {
        throw new Error(crearAlbumData.message || "Error al crear el álbum.");
      }

      const albumId = crearAlbumData.data.album_id;
      success({ message: `Álbum creado con ID ${albumId}. Subiendo portada...` });

      const portadaFormData = new FormData();
      portadaFormData.append("file", portadaFile);

      const subirPortadaRes = await fetch(
        `http://localhost:3000/albumes/upload/portada-album/${albumId}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: portadaFormData,
        }
      );

      const subirPortadaData = await subirPortadaRes.json();
      if (!subirPortadaRes.ok || subirPortadaData.error) {
        throw new Error(subirPortadaData.message || "Error al subir la portada.");
      }

      success({ message: "Portada del álbum subida exitosamente." });

      // 🎵 Añadir canciones
      const sectionTitle = document.createElement("h2");
      sectionTitle.textContent = "Añadir canciones al álbum";
      sectionTitle.classList.add("section-title");

      const cancionesContainer = document.createElement("div");
      cancionesContainer.classList.add("canciones_container");

      const addSongBtn = document.createElement("button");
      addSongBtn.type = "button";
      addSongBtn.textContent = "+ Añadir Canción";
      addSongBtn.classList.add("add-song-btn");

      addSongBtn.addEventListener("click", () => {
        const songGroup = document.createElement("div");
        songGroup.classList.add("song_group");

        songGroup.innerHTML = `
          <input type="text" name="titulo_cancion" placeholder="Título de la canción" required />
          <input type="text" name="duracion" placeholder="Duración (00:03:30)" required />
          <input type="number" name="numero_pista" placeholder="Pista #" required />
          <textarea name="descripcion" placeholder="Descripción" required></textarea>
          <input type="file" name="audio" accept="audio/*" required />
        `;

        cancionesContainer.appendChild(songGroup);
      });

      const finalizarBtn = document.createElement("button");
      finalizarBtn.textContent = "Subir Canciones al Álbum";
      finalizarBtn.type = "button";
      finalizarBtn.classList.add("upload-songs-btn");

      // ✅ INTEGRACIÓN DE LA NUEVA LÓGICA DE SUBIDA DE CANCIONES
      finalizarBtn.addEventListener("click", async () => {
        const songGroups = cancionesContainer.querySelectorAll(".song_group");
        if (songGroups.length === 0) {
          error({ message: "Agrega al menos una canción antes de subir." });
          return;
        }

        try {
          for (const group of songGroups) {
            const titulo = group.querySelector('input[name="titulo_cancion"]').value.trim();
            const duracion = group.querySelector('input[name="duracion"]').value.trim();
            const numero = group.querySelector('input[name="numero_pista"]').value.trim();
            const descripcion = group.querySelector('textarea[name="descripcion"]').value.trim();
            const audio = group.querySelector('input[name="audio"]').files[0];

            if (!titulo || !duracion || !numero || !audio) {
              throw new Error("Todos los campos de cada canción son obligatorios.");
            }

            const formData = new FormData();
            formData.append("file", audio);
            formData.append("titulo", titulo);
            formData.append("duracion", duracion);
            formData.append("numero_pista", numero);
            formData.append("descripcion", descripcion);
            formData.append("album_id", albumId);
            formData.append("artista_id", artistaId);

            const res = await fetch("http://localhost:3000/upload-audio/cancion/audio", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`
              },
              body: formData
            });

            const data = await res.json();

            if (!res.ok || data.error) {
              throw new Error(
                `Error al subir la canción "${titulo}": ${data.message || "Error desconocido"}`
              );
            }
          }

          success({ message: "Canciones y audios subidos correctamente." });
          window.location.hash = "#/perfil";
        } catch (err) {
          console.error("Error al subir canciones:", err.message);
          error({ message: err.message });
        }
      });

      const volverBtn = document.createElement("button");
      volverBtn.type = "button";
      volverBtn.textContent = "Volver sin subir canciones";
      volverBtn.classList.add("volver-btn");
      volverBtn.addEventListener("click", () => {
        window.location.hash = "#/perfil";
      });

      app.appendChild(document.createElement("hr"));
      app.appendChild(sectionTitle);
      app.appendChild(cancionesContainer);
      app.appendChild(addSongBtn);
      app.appendChild(finalizarBtn);
      app.appendChild(volverBtn);
    } catch (err) {
      console.error("Error:", err.message);
      error({ message: err.message });
    }
  });
};

// Función auxiliar
function createInputGroupHTML(type, id, labelText, required = false) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("input-group");

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = labelText;

  let input;
  if (type === "textarea") {
    input = document.createElement("textarea");
  } else {
    input = document.createElement("input");
    input.type = type;
  }

  input.id = id;
  input.required = required;
  wrapper.appendChild(label);
  wrapper.appendChild(input);

  return wrapper;
}




