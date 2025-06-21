export const AlbumesController = () => {
  const listar = async () => {
    try {
      const request = await fetch("http://localhost:3000/albumes", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      });
      
        // Verificamos si la solicitud fue exitosa
      const { data, code, message } = await request.json();

        // Verificamos si hay un error en la respuesta
      if (data.error) {
        console.error("Error al obtener los álbumes:", data.message);
        return;
      }

      const contentAlbumes = document.getElementById('content_Albumes');
      if (!contentAlbumes) return;

      /* Recorremos los álbumes y
        Limitamos a los primeros 6 álbumes para mostrar
        en la vista principal*/
      data.slice(0,6).forEach(({ titulo_album, descripcion }) => {
        // Creamos un elemento div para cada álbum
        const card = document.createElement("a");
        // Asignamos las clases y el contenido
        card.classList.add("card_album");
        // Asignamos el contenido del álbum
        card.textContent = titulo_album;

        // Agregamos la card al contenedor
        contentAlbumes.appendChild(card);
      });

    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
    }
  };

  listar();
}