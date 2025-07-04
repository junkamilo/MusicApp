import "./favoritos.css";
export const albumFavoritos = () => {
  const corazon = document.createElement("i");
  corazon.classList.add("fa-regular", "fa-heart", "corazon-icon");
  corazon.setAttribute("title", "Agregar a favoritos");

  corazon.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.hash = "#Login";
  });

  return corazon;
};
