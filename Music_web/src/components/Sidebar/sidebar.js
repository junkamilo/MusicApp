// sidebar.js (AJUSTADO PARA FONT AWESOME)
import "./sidebar.css";
import { estaAutenticado } from "../../helpers/auth.js";

export const sidebar = async () => {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) {
        console.error("El aside no se encontró");
        return;
    }

    // ✅ Limpiar contenido anterior
    sidebar.innerHTML = "";

    const toggleButton = document.createElement("button");
    toggleButton.setAttribute("id", "toggleSidebar");
    toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Icono de hamburguesa de Font Awesome

    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu");

    //si el usuario está logueado
    const usuarioLogueado = estaAutenticado();

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
            { label: "Inicio", iconClass: "fa-solid fa-house", hash: "#Home" },
            { label: "Géneros", iconClass: "fa-solid fa-compact-disc", hash: "#GenerosFavoritos" }, // Icono de disco
            { label: "Artistas", iconClass: "fa-solid fa-user-group", hash: "#ArtistasFavoritos" }, // Icono de grupo de usuarios
            { label: "Álbumes", iconClass: "fa-solid fa-book-open", hash: "#AlbumesFavoritos" }, // Icono de libro abierto
            { label: "Canciones Favoritas", iconClass: "fa-solid fa-heart", hash: "#CancionesFavoritos" }, // Icono de corazón
        ];

        navItems.forEach(({ label, iconClass, hash }) => {
            const btn = document.createElement("button");
            btn.classList.add("navItem");
            
            const iconElement = document.createElement("i");
            iconElement.classList.add(...iconClass.split(' ')); // Añade todas las clases del icono
            
            const spanElement = document.createElement("span");
            spanElement.textContent = label;

            btn.appendChild(iconElement);
            btn.appendChild(spanElement);

            btn.addEventListener("click", () => {
                window.location.hash = hash;
                // Lógica para marcar el elemento activo
                document.querySelectorAll('.navItem').forEach(item => item.classList.remove('active'));
                btn.classList.add('active');
            });
            menuContainer.appendChild(btn);
        });
        // Marcar el elemento activo al cargar la página
        const currentHash = window.location.hash || '#Home';
        const activeNavItem = menuContainer.querySelector(`.navItem[href="${currentHash}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }

    sidebar.appendChild(toggleButton);
    sidebar.appendChild(menuContainer);

    // Estado abierto o cerrado
    let isOpen = false; // Inicialmente cerrado
    // Leer el estado inicial del CSS si lo tienes definido por defecto
    const initialWidth = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width');
    if (initialWidth && initialWidth.trim() === '250px') {
        isOpen = true;
        toggleButton.innerHTML = '<i class="fa-solid fa-times"></i>'; // Icono de cerrar
        menuContainer.style.display = "flex";
    } else {
        toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Icono de hamburguesa
        menuContainer.style.display = "none";
    }


    toggleButton.addEventListener("click", () => {
        isOpen = !isOpen;
        if (isOpen) {
            document.documentElement.style.setProperty("--sidebar-width", "250px");
            menuContainer.style.display = "flex";
            toggleButton.innerHTML = '<i class="fa-solid fa-times"></i>'; // Icono de cerrar
        } else {
            document.documentElement.style.setProperty("--sidebar-width", "60px");
            menuContainer.style.display = "none";
            toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Icono de hamburguesa
        }
    });

    // Lógica para marcar el elemento activo al cargar la página
    window.addEventListener('hashchange', () => {
        const currentHash = window.location.hash || '#Home';
        document.querySelectorAll('.navItem').forEach(item => item.classList.remove('active'));
        const activeNavItem = menuContainer.querySelector(`[href="${currentHash}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    });
    // Llamar al inicio para establecer el estado activo
    const initialHash = window.location.hash || '#Home';
    const initialActiveNavItem = menuContainer.querySelector(`[href="${initialHash}"]`);
    if (initialActiveNavItem) {
        initialActiveNavItem.classList.add('active');
    }
};

// ✅ Escuchar eventos globales para volver a cargar el sidebar
window.addEventListener("usuario:logout", async () => {
    const sidebarEl = document.getElementById("sidebar");
    if (sidebarEl) {
        await sidebar();
    }
});

window.addEventListener("usuario:logueado", async () => {
    const sidebarEl = document.getElementById("sidebar");
    if (sidebarEl) {
        await sidebar();
    }
});
