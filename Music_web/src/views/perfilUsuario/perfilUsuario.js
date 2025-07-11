import { userProfile } from "../../components/perfilUsuario/userProfile";

export const perfilUsuario = () => {
    const contenedor = document.getElementById("app"); // O el ID de tu contenedor principal

    if (!contenedor) {
        console.error("No se encontró el contenedor principal para mostrar el perfil.");
        return;
    }

    // Renderizar el perfil del usuario
    userProfile(contenedor);
};
