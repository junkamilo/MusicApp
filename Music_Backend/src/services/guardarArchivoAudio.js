import fs from "fs";
import path from "path";
import AudioModel from "../models/actualizarRutaAudio.js"; // asegúrate que tengas este modelo

class AudioService {
  // Método estático para guardar el archivo y actualizar ruta en la base de datos
  static async guardarArchivoAudio(cancionId, file) {
    try {
      const extension = path.extname(file.originalname).toLowerCase();
      if (extension !== ".mp3") {
        return {
          error: true,
          code: 400,
          message: "El archivo debe ser formato .mp3"
        };
      }

      const nombreFinal = `${Date.now()}-${file.originalname}`;
      const destino = path.join("uploads/audio", nombreFinal);

      // Mover el archivo desde /tmp/ a /uploads/audio/
      fs.renameSync(file.path, destino);

      // Ruta que se guardará en la base de datos
      const rutaBD = `/uploads/audio/${nombreFinal}`;


      // Actualizar base de datos
      await AudioModel.actualizarRutaAudio(cancionId, rutaBD);

      return {
        error: false,
        code: 200,
        message: "Archivo subido y ruta actualizada correctamente",
        data: {
          cancionId,
          ruta: rutaBD
        }
      };
    } catch (error) {
      console.error("Error en AudioService:", error);
      return {
        error: true,
        code: 500,
        message: "Error al guardar el archivo de audio: " + error.message
      };
    }
  }

    // ✅ Nuevo método: crearCancionConAudio
  static async crearCancionConAudio(datos, file) {
    try {
      if (!file) {
        return {
          error: true,
          code: 400,
          message: "Debes subir un archivo .mp3"
        };
      }

      // 1. Insertar canción sin ruta
      const cancionId = await AudioModel.crearCancion(datos);

      // 2. Validar y mover archivo
      const extension = path.extname(file.originalname).toLowerCase();
      if (extension !== ".mp3") {
        return {
          error: true,
          code: 400,
          message: "Solo se permiten archivos .mp3"
        };
      }

      const nombreFinal = `${Date.now()}-${file.originalname}`;
      const destino = path.join("uploads/audio", nombreFinal);
      fs.renameSync(file.path, destino);

      const rutaBD = `audio/${nombreFinal}`;

      // 3. Actualizar ruta del archivo en DB
      await AudioModel.actualizarRutaAudio(cancionId, rutaBD);

      return {
        error: false,
        code: 201,
        message: "Canción creada con audio correctamente",
        data: {
          cancionId,
          ...datos,
          ruta_audio: rutaBD
        }
      };
    } catch (error) {
      console.error("❌ Error en crearCancionConAudio:", error);
      return {
        error: true,
        code: 500,
        message: "Error al crear canción con audio: " + error.message
      };
    }
  }
}

export default AudioService;


