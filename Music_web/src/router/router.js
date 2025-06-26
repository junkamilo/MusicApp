import { loadView } from "../helpers/loadView.js";
import { AlbumesController } from "../views/Albumes/AlbumesController.js";
import { artistasController } from "../views/Artistas/ArtistasController.js";
import { perfilArtistasController } from "../views/Artistas/perfilArtistasController.js";
import { CancionesController } from "../views/Canciones/CancionesController.js";
import { generosController } from "../views/Generos/generosController.js";
import { inicioController } from "../views/Inicio/InicioController.js";

const routes = {
  "/":{
    "template": "Inicio/inicio.html",
    controlador: inicioController,
  },
  Albumes:{
    "template": "Albumes/albumes.html",
    controlador: AlbumesController
  },
  Artistas:{
    "template": "Artistas/artistas.html",
    controlador : artistasController
  },
  perfilArtistas:{
    "template": "Artistas/perfilArtistas.html",
    controlador : perfilArtistasController
  },
  Canciones:{
    "template": "Canciones/canciones.html",
    controlador : CancionesController
  },
  Generos:{
    "template": "Generos/generos.html",
    controlador : generosController
  }
};


export const router = async (app) => {  
  const hash = location.hash.slice(1);
  const [ rutas, params ] = matchRoute(hash)

  if(!rutas){
    await loadView(app, 'Inicio/inicio.html');
    inicioController();
    return
  }
  
  //si las rutas son privadas y el usuario no esta autenticado
  /*if (rutas.private && !estaAutenticado()) {
    //lo redirijimos a que se inicie seccion(login)
    window.location.hash = "#login";
    return
  }*/
  // return
  
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