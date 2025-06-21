import './style.css';
import { router } from './router/router.js';

const app = document.querySelector("#app");


// Cargar el router al cambiar hash o al iniciar
window.addEventListener('hashchange', () => {
  router(app);
});

window.addEventListener("DOMContentLoaded", () => {
  router(app);
});