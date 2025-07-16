import { createAlbum } from "../../components/createAlbum/createAlbum";

export const subirAlbum = () =>{
            const contenedor = document.getElementById("app"); // O el ID de tu contenedor principal
        
            if (!contenedor) {
                console.error("No se encontró el contenedor principal para mostrar el perfil.");
                return;
            }
        
            // Renderizar el perfil del usuario
            createAlbum(contenedor);
}