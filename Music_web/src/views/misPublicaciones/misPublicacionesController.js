import { renderMisPublicaciones } from "../../components/renderMisPublicaciones/renderMisPublicaciones";

export const misPublicaciones = () =>{
    const contenedor = document.getElementById("app");

    if (!contenedor) {
      console.error("Falta el contenedor principal con ID 'mainContent'.");
      return;
    }

    renderMisPublicaciones(contenedor);
}