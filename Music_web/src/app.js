import './style.css';
import { generosController } from './views/Generos/generosController.js';
import { artistasController } from './views/Artistas/ArtistasController.js';
import { CancionesController } from './views/Canciones/CancionesController.js';
import { AlbumesController } from './views/Albumes/AlbumesController.js';
import { router } from './router.js';


// Cargar el router al cambiar hash o al iniciar
window.addEventListener('hashchange', () => {
  router(app);
});

window.addEventListener("DOMContentLoaded", () => {
  generosController();
  artistasController();
  CancionesController();
  AlbumesController();
  router(app);
});