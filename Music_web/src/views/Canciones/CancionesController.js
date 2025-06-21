export const CancionesController = () => {
  const listar = async () => {
    try {
      const request = await fetch("http://localhost:3000/canciones", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      });

      const { data, code, message } = await request.json();

      if (data.error) {
        console.error("Error al obtener las canciones:", data.message);
        return;
      }

      const contentCanciones = document.getElementById('content_canciones');
      if (!contentCanciones) return;

      // Recorremos las canciones
      data.slice(0,6).forEach(({ titulo_cancion}) => {
        // Creamos un elemento div para cada canción
        const card = document.createElement("div");
        // Asignamos las clases y el contenido
        card.classList.add("card_cancion");
        // Asignamos el contenido de la canción
        card.textContent = titulo_cancion;

        // Agregamos la card al contenedor
        contentCanciones.appendChild(card);
      });

    } catch (error) {
      console.error("Error al obtener las canciones:", error);
    }
  };

  listar();
}