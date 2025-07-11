import { editUserProfile } from "../../components/editarUsuarioperfil/editUserProfile";

export const editarPerfilUsuario = () => {
    const contenedor = document.getElementById("app"); // O el ID de tu contenedor principal
    
        if (!contenedor) {
            console.error("No se encontró el contenedor principal para mostrar el perfil.");
            return;
        }
    
        // Renderizar el perfil del usuario
        editUserProfile(contenedor);
}