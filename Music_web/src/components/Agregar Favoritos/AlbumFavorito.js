import "./favoritos.css";
export const albumFavoritos = () =>{
    const corazon = document.createElement("i");
    corazon.classList.add("fa-regular", "fa-heart", "corazon-icon");
    corazon.setAttribute("title", "Agregar a favoritos");
    return corazon;
}