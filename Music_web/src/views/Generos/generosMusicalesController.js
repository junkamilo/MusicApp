import { genreProfile } from "../../components/perfilGenero/genreProfile";


export const generosMusicalesController = async (params) => {
  const idGenero = params.id;

  // Asegúrate de tener un contenedor donde se renderizará el perfil completo
  const contenedorPrincipal = document.getElementById('app'); // O el ID de tu div central

  if (!contenedorPrincipal) {
    console.error("❌ Error: No se encontró el contenedor principal para renderizar el perfil del género.");
    return;
  }

  // Llama al nuevo renderizador
  await genreProfile(idGenero, contenedorPrincipal);
};
