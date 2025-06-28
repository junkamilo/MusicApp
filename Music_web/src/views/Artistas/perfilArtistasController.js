export const perfilArtistasController = (params) => {
  const listar = async () => {

    const idArtista = params.id;
    console.log("ID recibido del artista:", idArtista);

    if (!idArtista) {
      console.error("NO se encontró el id del artista en la URL");
      return;
    }
    // Realizamos una petición GET a la API para obtener los artistas por id
    try {
      const request = await fetch(
        `http://localhost:3000/artistas/${idArtista}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      const artista = await request.json();

      if (!artista || artista.error) {
        console.error("Error al obtener los datos del artista.");
        return;
      }

      const nombreArtista = document.getElementById("nombreArtista");
      const descripcionArtista = document.getElementById("biografiaArtista");

      if (nombreArtista) nombreArtista.textContent = artista.nombre_artista;
      if (descripcionArtista)
        descripcionArtista.textContent = artista.biografia || "Sin biografía";
    } catch (error) {
      console.error("Error al obtener los artistas:", error);
    }
  };

  listar();
};
