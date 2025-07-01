import "./sidebar.css";

export const sidebar = async () => {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) {
    console.error("El aside no se encontró");
    return;
  }

  const buttonAbrir = document.createElement("button");
  buttonAbrir.setAttribute("id", "buttonAbrir");
  buttonAbrir.textContent = "☰";

  const menuContainer = document.createElement("div");
  menuContainer.classList.add("menu");

  const buttonCerra = document.createElement("button");
  buttonCerra.setAttribute("id", "buttonCerra");
  buttonCerra.textContent = "Cerrar";

  const dummyItem = document.createElement("p");
  dummyItem.textContent = "Aquí el contenido del menú";
  dummyItem.style.color = "#fff";

  menuContainer.appendChild(buttonCerra);
  menuContainer.appendChild(dummyItem);

  sidebar.appendChild(buttonAbrir);
  sidebar.appendChild(menuContainer);

  buttonAbrir.addEventListener("click", () => {
    document.documentElement.style.setProperty('--sidebar-width', '250px');
    menuContainer.style.display = 'flex';
  });

  buttonCerra.addEventListener("click", () => {
    document.documentElement.style.setProperty('--sidebar-width', '60px');
    menuContainer.style.display = 'none';
  });
};


