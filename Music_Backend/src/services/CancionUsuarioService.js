import path from "path";
import fs from "fs";
import CancionUsuarioModel from "../models/CancionUsuario.js";

class CancionUsuarioService{
  static async guardarCancionUsuario(id_usuario, file, body) {
    const extension = path.extname(file.originalname).toLowerCase();
    if (extension !== ".mp3") {
      throw new Error("El archivo debe ser formato .mp3");
    }
    const nombreFinal = `${Date.now()}-${file.originalname}`;
    const destino = path.join("uploads/audio", nombreFinal);

    fs.renameSync(file.path, destino);

    const rutaBD = `/audio/${nombreFinal}`;

    const nuevaCancion = await CancionUsuarioModel.crearCancion({
      id_usuario,
      titulo: body.titulo || file.originalname.replace(".mp3", ""),
      duracion: body.duracion || "00:03:00",
      url_archivo_audio: rutaBD
    });

    return nuevaCancion;
  }

    static async obtenerCancionesDeUsuario(id_usuario) {
    return await CancionUsuarioModel.obtenerCancionesPorUsuario(id_usuario);
  }

  //metodo para eliminar canciones del usuario
static async eliminarCancionUsuario(id_cancion_usuario, id_usuario) {
  return await CancionUsuarioModel.eliminarCancion(id_cancion_usuario, id_usuario);
}
}

export default CancionUsuarioService;
