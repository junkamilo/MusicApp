export const artistasController = () => {
  const listar = async () => {
    try {
      const request = await fetch("http://localhost:3000/artistas", {
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

      const contentArtistas = document.getElementById('content_ArtistasMusicales');
      if (!contentArtistas) return;

      // Recorremos los artistas
      data.slice(0,6).forEach(({ nombre_artista, descripcion }) => {
        // Creamos un elemento div para cada artista
        const card = document.createElement("div");
        // Asignamos las clases y el contenido
        card.classList.add("card_artista");
        // Asignamos el contenido del artista
        card.textContent = nombre_artista;

        //agregamos la card al contenedor
        contentArtistas.appendChild(card);
      });

    } catch (error) {
      console.error("Error al obtener los artistas:", error);
    }
  };

  listar();
}