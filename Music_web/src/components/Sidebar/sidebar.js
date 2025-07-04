import "./sidebar.css";

export const sidebar = async () => {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) {
    console.error("El aside no se encontró");
    return;
  }

  const toggleButton = document.createElement("button");
  toggleButton.setAttribute("id", "toggleSidebar");
  toggleButton.textContent = "☰";

  const menuContainer = document.createElement("div");
  menuContainer.classList.add("menu");

  // Simular si el usuario está logueado
  const usuarioLogueado = false; // Aquí lo cambiarás cuando tengas auth

  if (!usuarioLogueado) {
    const bienvenida = document.createElement("p");
    bienvenida.textContent = "Bienvenido! Inicia sesión para explorar música.";
    bienvenida.classList.add("mensajeLogin");

    const loginBtn = document.createElement("button");
    loginBtn.textContent = "Iniciar sesión";
    loginBtn.classList.add("loginButton");
    loginBtn.addEventListener("click", () => {
      window.location.hash = "#Login"; // modo por defecto: Sign In
    });

    const registerBtn = document.createElement("button");
    registerBtn.textContent = "Registrarse";
    registerBtn.classList.add("registerButton");
    registerBtn.addEventListener("click", () => {
      window.location.hash = "#Login";
    });

    menuContainer.append(bienvenida, loginBtn, registerBtn);
  } else {
    const navItems = [
      { label: "Inicio", icon: "🎵", hash: "#Home" },
      { label: "Géneros", icon: "🎧", hash: "#Generos" },
      { label: "Artistas", icon: "👨‍🎤", hash: "#Artistas" },
      { label: "Álbumes", icon: "💿", hash: "#Albumes" },
      { label: "Favoritos", icon: "❤️", hash: "#Favoritos" },
    ];

    navItems.forEach(({ label, icon, hash }) => {
      const btn = document.createElement("button");
      btn.classList.add("navItem");
      btn.innerHTML = `${icon} <span>${label}</span>`;
      btn.addEventListener("click", () => {
        window.location.hash = hash;
      });
      menuContainer.appendChild(btn);
    });
  }

  sidebar.appendChild(toggleButton);
  sidebar.appendChild(menuContainer);

  // Estado abierto o cerrado
  let isOpen = false;
  toggleButton.addEventListener("click", () => {
    isOpen = !isOpen;
    if (isOpen) {
      document.documentElement.style.setProperty("--sidebar-width", "250px");
      menuContainer.style.display = "flex";
      toggleButton.textContent = "×";
    } else {
      document.documentElement.style.setProperty("--sidebar-width", "60px");
      menuContainer.style.display = "none";
      toggleButton.textContent = "☰";
    }
  });
};
