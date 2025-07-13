import { userUploadedSongs } from "../../components/userUploadedSongs/userUploadedSongs";

export const mostrarCanciones = () =>{
      const contenedor = document.getElementById("app");
    
      if (!contenedor) {
        console.error("No se encontró el contenedor principal.");
        return;
      }
    
      userUploadedSongs(contenedor);
}