export const artistasController = () => {
  const listar = async () => {
    // Realizamos una petición GET a la API para obtener los artistas con el genero musical id:1 Rock
    try {
      const request = await fetch("http://localhost:3000/artistas/genero/1", {
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

      const contentArtistasRock = document.getElementById('content_Artistasrock');

      if (!contentArtistasRock) return;

      const verMas = contentArtistasRock.querySelector('.ver-mas');

      // Recorremos los artistas
      data.slice(0,6).forEach(({ nombre_artista}) => {
        // Creamos un elemento div para cada artista
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/artistas/${nombre_artista}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_artista");
        // Asignamos el contenido del artista
        card.textContent = nombre_artista;

        //agregamos la card al contenedor
        contentArtistasRock.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los artistas:", error);
    }


    // Realizamos una petición GET a la API para obtener los artistas con el genero musical id:2 Pop
    try {
      const request = await fetch("http://localhost:3000/artistas/genero/2", {
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

      const contentArtistasPop = document.getElementById('content_Artistaspop');

      if (!contentArtistasPop) return;

      const verMas = contentArtistasPop.querySelector('.ver-mas');

      // Recorremos los artistas
      data.slice(0,6).forEach(({ nombre_artista}) => {
        // Creamos un elemento div para cada artista
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/artistas/${nombre_artista}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_artista");
        // Asignamos el contenido del artista
        card.textContent = nombre_artista;

        //agregamos la card al contenedor
        contentArtistasPop.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los artistas:", error);
    }


    // Realizamos una petición GET a la API para obtener los artistas con el genero musical id:3 Pop
    try {
      const request = await fetch("http://localhost:3000/artistas/genero/3", {
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

      const contentArtistasUrbana = document.getElementById('content_ArtistasmusicaUrbana');

      if (!contentArtistasUrbana) return;

      const verMas = contentArtistasUrbana.querySelector('.ver-mas');

      // Recorremos los artistas
      data.slice(0,6).forEach(({ nombre_artista}) => {
        // Creamos un elemento div para cada artista
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/artistas/${nombre_artista}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_artista");
        // Asignamos el contenido del artista
        card.textContent = nombre_artista;

        //agregamos la card al contenedor
        contentArtistasUrbana.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los artistas:", error);
    }


    // Realizamos una petición GET a la API para obtener los artistas con el genero musical id:4 vallenato
    try {
      const request = await fetch("http://localhost:3000/artistas/genero/4", {
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

      const contentArtistasVallenato = document.getElementById('content_Artistasvallenato');

      if (!contentArtistasVallenato) return;

      const verMas = contentArtistasVallenato.querySelector('.ver-mas');

      // Recorremos los artistas
      data.slice(0,6).forEach(({ nombre_artista}) => {
        // Creamos un elemento div para cada artista
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/artistas/${nombre_artista}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_artista");
        // Asignamos el contenido del artista
        card.textContent = nombre_artista;

        //agregamos la card al contenedor
        contentArtistasVallenato.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los artistas:", error);
    }


    // Realizamos una petición GET a la API para obtener los artistas con el genero musical id:5 musica popular
    try {
      const request = await fetch("http://localhost:3000/artistas/genero/5", {
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

      const contentArtistasPopular = document.getElementById('content_ArtistasmusicaPopular');

      if (!contentArtistasPopular) return;

      const verMas = contentArtistasPopular.querySelector('.ver-mas');

      // Recorremos los artistas
      data.slice(0,6).forEach(({ nombre_artista}) => {
        // Creamos un elemento div para cada artista
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/artistas/${nombre_artista}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_artista");
        // Asignamos el contenido del artista
        card.textContent = nombre_artista;

        //agregamos la card al contenedor
        contentArtistasPopular.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los artistas:", error);
    }

    // Realizamos una petición GET a la API para obtener los artistas con el genero musical id:6 musica regueton
    try {
      const request = await fetch("http://localhost:3000/artistas/genero/6", {
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

      const contentArtistasRegueton = document.getElementById('content_Artistasregueton');

      if (!contentArtistasRegueton) return;

      const verMas = contentArtistasRegueton.querySelector('.ver-mas');

      // Recorremos los artistas
      data.slice(0,6).forEach(({ artista_id,nombre_artista}) => {
        // Creamos un elemento div para cada artista
        const card = document.createElement("a");
        // Asignamos un enlace a la card
        card.setAttribute("href", `#/perfilArtistas?id=${artista_id}`);
        // Asignamos las clases y el contenido
        card.classList.add("card_artista");
        // Asignamos el contenido del artista
        card.textContent = nombre_artista;

        //agregamos la card al contenedor
        contentArtistasRegueton.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los artistas:", error);
    }
  };

  

  listar();
}