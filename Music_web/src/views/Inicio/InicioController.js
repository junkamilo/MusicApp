export const inicioController = async () =>{
    //hacemos peticion  a los géneros musicales
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
      data.slice(0,6).forEach(({ nombre_genero, descripcion }) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/generosMusicales/${nombre_genero}`);
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
    
    //listamos los artistas destacados
    try {
      const request = await fetch("http://localhost:3000/artistas/destacados", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      });

      console.log(request);
      
      
      const {data, code, message} = await request.json();
      
      
      if (data.error) {
        console.error("Error al obtener los artitas destacados :", data.message);
        return;        
      }

      const contentGenerosMusical = document.getElementById('content_ArtistasMusicales');
      if (!contentGenerosMusical) return;

      const verMas = contentGenerosMusical.querySelector('.ver-mas');
      
      // Recorremos los artistas
      data.slice(0,6).forEach(({ nombre_artista, nombre_genero  }) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/artistas/${nombre_artista}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_artista");
        // Asignamos el nombre del artista
        card.textContent = nombre_artista;

        //agregamos la card al contenedor
        contentGenerosMusical.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los artistas destacados:", error);
    }

    //listamos los albumes
    try {
      const request = await fetch("http://localhost:3000/albumes", {
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

      const contentGenerosMusical = document.getElementById('content_Albumes');
      if (!contentGenerosMusical) return;

      const verMas = contentGenerosMusical.querySelector('.ver-mas');
      
      // Recorremos los albumes
      data.slice(0,6).forEach(({ titulo_album, descripcion }) => {
        // Creamos un elemento a para los albumes
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/albumes/${titulo_album}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_album");
        // Asignamos el contenido del album
        card.textContent = titulo_album;

        //agregamos la card al contenedor
        contentGenerosMusical.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los géneros musicales:", error);
    }

    //listamos las canciones
    try {
      const request = await fetch("http://localhost:3000/canciones", {
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

      const contentGenerosMusical = document.getElementById('content_canciones');
      if (!contentGenerosMusical) return;

      const verMas = contentGenerosMusical.querySelector('.ver-mas');
      
      // Recorremos las canciones
      data.slice(0,6).forEach(({ titulo_cancion, descripcion }) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/canciones/${titulo_cancion}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_cancion");
        // Asignamos el contenido de la canción
        card.textContent = titulo_cancion;

        //agregamos la card al contenedor
        contentGenerosMusical.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los géneros musicales:", error);
    }
}