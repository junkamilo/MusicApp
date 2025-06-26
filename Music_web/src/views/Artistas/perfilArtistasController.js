export const perfilArtistasController = (params) => {
    const listar = async () => {
        const idArtista = params.id;

        if (!idArtista) {
            console.error("NO se encontró el id del artista en la URL");
            return;
            
        }
        // Realizamos una petición GET a la API para obtener el artista badbunny id: 6
        try {
      const request = await fetch(`http://localhost:3000/artistas/${idArtista}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      });

      const {data, code, message} = await request.json();
      

      if (data.error) {
        console.error("Error al obtener los artistas:", data.message);
        return;        
      }

      const nombreArtista = document.getElementById('nombreArtista');
      const descripcionArtista = document.getElementById('biografiaArtista');

       if (nombreArtista) nombreArtista.textContent = data.nombre_artista;
      if (descripcionArtista) descripcionArtista.textContent = data.biografia || "Sin biografía";

    } catch (error) {
      console.error("Error al obtener los artistas:", error);
    }
    };

    listar();
};