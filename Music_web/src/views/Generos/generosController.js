export const generosController = () => {
  const listar = async () => {
    try {
      const request = await fetch("http://localhost:3000/generosMusicales", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      });
      
      console.log(request);
      
      const {data, code, message} = await request.json();
      
      if (data.error) {
        console.error("Error al obtener los géneros musicales:", data.message);
        return;        
      }

      const contentGenerosMusical = document.getElementById('content_generoMusicales');
      if (!contentGenerosMusical) return;

      // Recorremos los géneros
      data.forEach(({ nombre_genero, descripcion }) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("div");
        // Asignamos las clases y el contenido
        card.classList.add("card_generoMusical");
        // Asignamos el contenido del género musical
        card.textContent = nombre_genero;

        //agregamos la card al contenedor
        contentGenerosMusical.appendChild(card);
      });

    } catch (error) {
      console.error("Error al obtener los géneros musicales:", error);
    }
  };

  listar();
};



