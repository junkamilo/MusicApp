// helpers/buscador.js

export const activarBuscadorGlobal = (contenedoresIds = []) => {
  const handleBusqueda = (e) => {
    const termino = e.detail.termino.toLowerCase();

    contenedoresIds.forEach((id) => {
      const contenedor = document.getElementById(id);
      if (!contenedor) return;

      const cards = contenedor.querySelectorAll('[class^="card_"], [class*=" card_"]');
      let hayCoincidencia = false;

      cards.forEach((card) => {
        const texto = card.textContent.toLowerCase();
        if (texto.includes(termino)) {
          card.style.display = "block";
          hayCoincidencia = true;
        } else {
          card.style.display = "none";
        }
      });

      // Mensaje si no hay resultados
      let mensaje = contenedor.querySelector(".no-result");
      if (!hayCoincidencia) {
        if (!mensaje) {
          mensaje = document.createElement("p");
          mensaje.classList.add("no-result");
          mensaje.textContent = "No se encontraron resultados.";
          contenedor.appendChild(mensaje);
        }
      } else {
        if (mensaje) mensaje.remove();
      }
    });
  };

  // Registrar evento
  window.addEventListener("buscar:musica", handleBusqueda);

  // Limpiar al cambiar de vista
  const limpiar = () => {
    window.removeEventListener("buscar:musica", handleBusqueda);
  };
  window.addEventListener("hashchange", limpiar);
};
