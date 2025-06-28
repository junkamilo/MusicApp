export const AlbumesMusicalesController = async (params) => {
  const idAlbum = params.id;
  const listar = async () => {
    try {
      // Obtener información del álbum
      const resAlbum = await fetch(`http://localhost:3000/albumes/${idAlbum}`);
      const { data: album } = await resAlbum.json();

      document.getElementById("nombreAlbum").textContent = album.nombre_album;
      document.getElementById("descripcionAlbum").textContent =album.descripcion;

      // Obtener canciones del álbum
    const resCanciones = await fetch(`http://localhost:3000/albumes/${idAlbum}/canciones`);
    const { data: canciones } = await resCanciones.json();

    const contenedor = document.getElementById("cancionesAlbum");

    canciones.forEach(cancion => {
      const card = document.createElement("div");
      card.classList.add("card-cancion");

       const titulo = document.createElement("h3");
       titulo.textContent = cancion.titulo;

    const duracion = document.createElement("p");
    duracion.textContent = `Duración: ${cancion.duracion}`;

          contenedor.appendChild(card);
    });
    } catch (error) {
      console.error("Error al obtener los álbumes musicales:", error);
    }
  };
  listar();
};
