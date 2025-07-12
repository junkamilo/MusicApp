import './style.css';
import { router } from './router/router.js';
import { sidebar } from './components/Sidebar/sidebar.js';
import { header } from './components/header/header.js';

const app = document.querySelector("#app");


// Cargar el router al cambiar hash o al iniciar
window.addEventListener('hashchange', () => {
    router(app).then(() => {
    sidebar(); 
    header();
  });
});

window.addEventListener("DOMContentLoaded", () => {
  router(app).then(() => {
    sidebar();
    header();
  });
});