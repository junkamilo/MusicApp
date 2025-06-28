export const generosMusicalesController = async (params) => {
  const idGenero = params.id;

  const listar = async () => {
    try {
      const response = await fetch(`http://localhost:3000/generosMusicales/${idGenero}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      });

      if (!response.ok) {
        console.error("Error: no se encontró el género. Código:", response.status);
        return;
      }

      const genero = await response.json();


      const img = document.getElementById('imagenGenero');
      const historia = document.getElementById('historiaGenero');
      const nombre = document.getElementById('nombreGenero');

      if (img) img.src = genero.imagen || 'default.jpg';
      if (historia) {
        historia.textContent = genero.descripcion
          ? genero.descripcion.slice(0, 200) + '...'
          : "Historia no disponible";
      }
      if (nombre) nombre.textContent = genero.nombre_genero || 'Género Desconocido';

    } catch (error) {
      console.error("Error al obtener los géneros musicales:", error);
    }
  };

  listar();
};