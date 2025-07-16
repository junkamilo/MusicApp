import { estaAutenticado } from "../helpers/auth.js";
import { loadView } from "../helpers/loadView.js";
import { AlbumesController } from "../views/Albumes/AlbumesController.js";
import { albumesFavoritosController } from "../views/Albumes/albumesFavoritosController.js";
import { AlbumesMusicalesController } from "../views/Albumes/AlbumesMusicalesController.js";
import { artistasController } from "../views/Artistas/ArtistasController.js";
import { artistasFavoritosController } from "../views/Artistas/artistasFavoritosController.js";
import { perfilArtistasController } from "../views/Artistas/perfilArtistasController.js";
import { cambiarContrasena } from "../views/cambiarContrasena/cambiarContrasena.js";
import { CancionesController } from "../views/Canciones/CancionesController.js";
import { cancionesFavoritosController } from "../views/Canciones/cancionesFavoritosController.js";
import { editarPerfilUsuario } from "../views/editarPerfilUsuario/editarPerfilUsuario.js";
import { generosController } from "../views/Generos/generosController.js";
import { generosFavoritosController } from "../views/Generos/generosFavoritosController.js";
import { generosMusicalesController } from "../views/Generos/generosMusicalesController.js";
import { inicioController } from "../views/Inicio/InicioController.js";
import { loginController } from "../views/login/loginController.js";
import { perfilUsuario } from "../views/perfilUsuario/perfilUsuario.js";
import { SerArtistaController } from "../views/SerArtista/SerArtistaController.js";
import { subirAlbum } from "../views/SubirAlbum/subirAlbumController.js";

const routes = {
  "/":{
    "template": "Inicio/inicio.html",
    controlador: inicioController,
    private: false
  },
  Albumes:{
    "template": "Albumes/albumes.html",
    controlador: AlbumesController,
    private: true
  },
  AlbumesFavoritos:{
    "template": "Albumes/albumesFavoritos.html",
    controlador: albumesFavoritosController,
    private: true
  },
  subirAlbum:{
    "template": "SubirAlbum/subirAlbum.html",
    controlador: subirAlbum,
    private: true
  },
  "/albumes/:id":{
    "template": "Albumes/albumesMusicales.html",
    controlador: AlbumesMusicalesController,
    private: true
  },
  Artistas:{
    "template": "Artistas/artistas.html",
    controlador : artistasController,
    private: true
  },
  ArtistasFavoritos:{
    "template": "Artistas/artistasFavoritos.html",
    controlador : artistasFavoritosController,
    private: true
  },
  "/artistas/:id":{
    "template": "Artistas/perfilArtistas.html",
    controlador : perfilArtistasController,
    private: true
  },
  Canciones:{
    "template": "Canciones/canciones.html",
    controlador : CancionesController,
    private: true
  },
  CancionesFavoritos:{
    "template": "Canciones/cancionesFavoritos.html",
    controlador : cancionesFavoritosController,
    private: true
  },
  Generos:{
    "template": "Generos/generos.html",
    controlador : generosController,
    private: true
  },
  "/generosMusicales/:id":{
    "template": "Generos/generosMusicales.html",
    controlador : generosMusicalesController,
    private: true
  },
  GenerosFavoritos:{
    "template": "Generos/generosFavoritos.html",
    controlador : generosFavoritosController,
    private: true
  },
  Login:{
    "template": "login/login.html",
    controlador: loginController,
    private: false
  },
  Perfil:{
    "template": "perfilUsuario/perfilUsuario.html",
    controlador: perfilUsuario,
    private: true
  },
  EditarPerfil:{
    "template": "editarPerfilUsuario/editarPerfilUsuario.html",
    controlador: editarPerfilUsuario,
    private: true
  },
  EditarContrasena:{
    "template": "cambiarContrasena/cambiarContrasena.html",
    controlador: cambiarContrasena,
    private: true
  },
  SerArtista:{
    "template": "SerArtista/SerArtista.html",
    controlador: SerArtistaController,
    private: true
  }
};


export const router = async (app) => {

  const hash = location.hash.slice(1);
  const [ rutas, params ] = matchRoute(hash)

  if(!rutas){
    app.className = "";
    await loadView(app, 'Inicio/inicio.html');
    inicioController();
    return
  }
  
  //si las rutas son privadas y el usuario no esta autenticado
  if (rutas.private && !estaAutenticado()) {
    //lo redirijimos a que se inicie seccion(login)
    window.location.hash = "#Login";
    return
  }
  // return
  app.className = "";
  
  // Llamando la vista
  await loadView(app, rutas.template);
  // Ejecutar el controldor
  rutas.controlador(params)
}

const matchRoute = (hash) => {  
  const arreglo = hash.split('/') ;  

  for (const route in routes) {
    const b = route.split('/');   
    
    if (b.length !== arreglo.length) continue
    
    const params = {}

    const matched = b.every((parte, i) => {      
      if (parte.startsWith(":")) {   
        const partName = parte.slice(1);
        const value = arreglo[i];
        params[partName] = value;
        return true
      }
      if (parte === arreglo[i]){
        return true
      }
    }); 

    if (matched) {      
      return [routes[route], params]
    }
  }
  return [null, null]
}