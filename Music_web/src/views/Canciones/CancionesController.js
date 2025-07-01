export const CancionesController = async () =>{
    try {
        // Realizamos una petición a la API para obtener las canciones más populares del genero rock
      const request = await fetch("http://localhost:3000/canciones/genero/1", {
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

      const contentGenerosMusical = document.getElementById('content_cancionRock');
      if (!contentGenerosMusical) return;

      const verMas = contentGenerosMusical.querySelector('.ver-mas');
      
      // Recorremos los géneros
      data.slice(0,6).forEach(({ genero_id,titulo_cancion, }) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/generosMusicales/${genero_id}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_generoMusical");
        // Asignamos el contenido del género musical
        card.textContent = titulo_cancion;

        //agregamos la card al contenedor
        contentGenerosMusical.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los géneros musicales:", error);
    }

    try {
        // Realizamos una petición a la API para obtener las canciones más populares del genero pop
      const request = await fetch("http://localhost:3000/canciones/genero/2", {
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

      const contentGenerosMusical = document.getElementById('content_cancionPop');
      if (!contentGenerosMusical) return;

      const verMas = contentGenerosMusical.querySelector('.ver-mas');
      
      // Recorremos los géneros
      data.slice(0,6).forEach(({ genero_id,titulo_cancion, }) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/generosMusicales/${genero_id}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_generoMusical");
        // Asignamos el contenido del género musical
        card.textContent = titulo_cancion;

        //agregamos la card al contenedor
        contentGenerosMusical.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los géneros musicales:", error);
    }

    try {
        // Realizamos una petición a la API para obtener las canciones más populares del genero urbano
      const request = await fetch("http://localhost:3000/canciones/genero/3", {
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

      const contentGenerosMusical = document.getElementById('content_cancionUrbana');
      if (!contentGenerosMusical) return;

      const verMas = contentGenerosMusical.querySelector('.ver-mas');
      
      // Recorremos los géneros
      data.slice(0,6).forEach(({ genero_id,titulo_cancion, }) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/generosMusicales/${genero_id}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_generoMusical");
        // Asignamos el contenido del género musical
        card.textContent = titulo_cancion;

        //agregamos la card al contenedor
        contentGenerosMusical.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los géneros musicales:", error);
    }

     try {
        // Realizamos una petición a la API para obtener las canciones más populares del genero vallenato
      const request = await fetch("http://localhost:3000/canciones/genero/4", {
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

      const contentGenerosMusical = document.getElementById('content_cancionVallenato');
      if (!contentGenerosMusical) return;

      const verMas = contentGenerosMusical.querySelector('.ver-mas');
      
      // Recorremos los géneros
      data.slice(0,6).forEach(({ genero_id,titulo_cancion, }) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/generosMusicales/${genero_id}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_generoMusical");
        // Asignamos el contenido del género musical
        card.textContent = titulo_cancion;

        //agregamos la card al contenedor
        contentGenerosMusical.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los géneros musicales:", error);
    }

    try {
        // Realizamos una petición a la API para obtener las canciones más populares del genero popular
      const request = await fetch("http://localhost:3000/canciones/genero/5", {
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

      const contentGenerosMusical = document.getElementById('content_cancionPopular');
      if (!contentGenerosMusical) return;

      const verMas = contentGenerosMusical.querySelector('.ver-mas');
      
      // Recorremos los géneros
      data.slice(0,6).forEach(({ genero_id,titulo_cancion, }) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/generosMusicales/${genero_id}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_generoMusical");
        // Asignamos el contenido del género musical
        card.textContent = titulo_cancion;

        //agregamos la card al contenedor
        contentGenerosMusical.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los géneros musicales:", error);
    }

    try {
        // Realizamos una petición a la API para obtener las canciones más populares del genero regueton
      const request = await fetch("http://localhost:3000/canciones/genero/6", {
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

      const contentGenerosMusical = document.getElementById('content_cancionRegueton');
      if (!contentGenerosMusical) return;

      const verMas = contentGenerosMusical.querySelector('.ver-mas');
      
      // Recorremos los géneros
      data.slice(0,6).forEach(({ genero_id,titulo_cancion, }) => {
        // Creamos un elemento div para cada género musical
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/generosMusicales/${genero_id}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_generoMusical");
        // Asignamos el contenido del género musical
        card.textContent = titulo_cancion;

        //agregamos la card al contenedor
        contentGenerosMusical.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los géneros musicales:", error);
    }
}