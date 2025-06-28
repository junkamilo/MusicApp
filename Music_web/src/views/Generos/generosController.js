export const generosController = async () => {
  //listamos los géneros musicales
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

      const verMas = contentGenerosMusical.querySelector('.ver-mas');
      
      // Recorremos los géneros
      data.slice(0,6).forEach(({ genero_id,nombre_genero,}) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/generosMusicales/${genero_id}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_generoMusical");
        // Asignamos el contenido del género musical
        card.textContent = nombre_genero;

        //agregamos la card al contenedor
        contentGenerosMusical.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los géneros musicales:", error);
    }
};



