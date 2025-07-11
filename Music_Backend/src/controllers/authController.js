import { ResponseProvider } from "../providers/ResponseProvider.js";
import AuthService from "../services/authService.js";

class AuthController {
static register = async (req, res) => {
  const { nombre, email, contrasena } = req.body;
  try {
    const response = await AuthService.register(nombre, email, contrasena);
    if (!response.error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.success(res, {}, response.message, response.code);
    } else {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, response.message, response.code);
    }    
  } catch (error) {
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
}

static login = async (req, res) =>{
    const { email, contrasena } = req.body;
  try {
    const response = await AuthService.login(email, contrasena);
    if (response.error) {
      console.log(response);
      
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(
        res,
        response.message,
        response.code
      );
    } else {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    }
  } catch (error) {
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
}

static logout = async (req, res) => {
  try {
    // Llamamos el servio y pasamos el id del usuario
    const response = await AuthService.logout(req.user.id);
    // Llamamos el provider para centralizar los mensajes de respuesta
    ResponseProvider.success(res, {}, response.message, response.code);
    return res.status(response.code).json(response);
  } catch (error) {
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
}

static refreshToken = async (req, res) => {
  try {
    const refreshToken = req.refreshToken;

    const response = await AuthService.verifyAccessToken(refreshToken);

    if (response.error) {
      return ResponseProvider.error(res, response.message, response.code);
    }

    ResponseProvider.success(
      res,
      response.data,
      response.message,
      response.code
    );
  } catch (error) {
    ResponseProvider.error(res, "Error en el servidor", 500);
  }
};

  // Obtener información del usuario
  static async getUsuarioInfo(req, res) {
  try {
    console.log("🔎 req.user:", req.user);
    const userId = req.user.id;
    const userInfoResult = await AuthService.obtenerInfoUsuario(userId);

    if (userInfoResult.error) {
      return ResponseProvider.error(res, userInfoResult.message, userInfoResult.code);
    }

    return ResponseProvider.success(
      res,
      userInfoResult.data,
      "Información del usuario obtenida correctamente",
      200
    );
  } catch (error) {
    return ResponseProvider.error(res, "Error al obtener la información del usuario", 500);
  }
}


}

export default AuthController;



