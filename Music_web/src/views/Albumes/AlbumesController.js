export const AlbumesController = () => {
  const listar = async () => {
    // Realizamos una solicitud GET a la API para obtener los álbumes mas populares del genero id:1 rock
    try {
      const request = await fetch("http://localhost:3000/albumes/genero/1", {
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

      const contentAlbumesrock = document.getElementById('content_Albumrock');
      if (!contentAlbumesrock) return;

      const verMas = contentAlbumesrock.querySelector('.ver-mas');

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
        contentAlbumesrock.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
    }


    // Realizamos una solicitud GET a la API para obtener los álbumes mas populares del genero id:2 pop
    try {
      const request = await fetch("http://localhost:3000/albumes/genero/2", {
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

      const contentAlbumespop = document.getElementById('content_Albumpop');
      if (!contentAlbumespop) return;

      const verMas = contentAlbumespop.querySelector('.ver-mas');

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
        contentAlbumespop.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
    }


    // Realizamos una solicitud GET a la API para obtener los álbumes mas populares del genero id:3 urbana
    try {
      const request = await fetch("http://localhost:3000/albumes/genero/3", {
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

      const contentAlbumesUrbana = document.getElementById('content_AlbumMusicaUrbana');
      if (!contentAlbumesUrbana) return;

      const verMas = contentAlbumesUrbana.querySelector('.ver-mas');

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
        contentAlbumesUrbana.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
    }


    // Realizamos una solicitud GET a la API para obtener los álbumes mas populares del genero id:4 vallenato
    try {
      const request = await fetch("http://localhost:3000/albumes/genero/4", {
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

      const contentAlbumesVallenato = document.getElementById('content_Albumvallenato');
      if (!contentAlbumesVallenato) return;

      const verMas = contentAlbumesVallenato.querySelector('.ver-mas');

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
        contentAlbumesVallenato.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
    }


    // Realizamos una solicitud GET a la API para obtener los álbumes mas populares del genero id:5 popular
    try {
      const request = await fetch("http://localhost:3000/albumes/genero/5", {
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

      const contentAlbumesPopular = document.getElementById('content_AlbumMusicaPopular');
      if (!contentAlbumesPopular) return;

      const verMas = contentAlbumesPopular.querySelector('.ver-mas');

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
        contentAlbumesPopular.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
    }



    // Realizamos una solicitud GET a la API para obtener los álbumes mas populares del genero id:6 regueton
    try {
      const request = await fetch("http://localhost:3000/albumes/genero/6", {
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

      const contentAlbumesRegueton = document.getElementById('content_Albumregueton');
      if (!contentAlbumesRegueton) return;

      const verMas = contentAlbumesRegueton.querySelector('.ver-mas');

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
        contentAlbumesRegueton.insertBefore(card, verMas);
      });

    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
    }
  };

  listar();
}