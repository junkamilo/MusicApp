import GenerosService from "../services/GenerosService.js";

class GenerosController {
    //obtenemos todos los géneros
    static getAllGeneros = async (req, res) => {
        try {
            //llamamos al servicio para obtener los géneros
            const response = await GenerosService.getAllGeneros();
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos los géneros obtenidos
            return res.status(response.code).json(response);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener los géneros: " + error.message });
        }
    }
    //obtenemos un género por su id
    static getGeneroById = async (req, res) => {
        const { id } = req.params; //obtenemos el id del género desde los parámetros de la solicitud
        try {
            //llamamos al servicio para obtener el género por su id
            const response = await GenerosService.getGeneroById(id);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el género obtenido
            return res.status(response.code).json(response.data);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener el género: " + error.message });
        }
    }

    //obtenemos los géneros favoritos de un usuario
    static getGenerosFavoritosByUserId = async (req, res) => {
        const userId = req.user.id; //obtenemos el id del usuario desde el token de autenticación
        try {
            //llamamos al servicio para obtener los géneros favoritos del usuario
            const response = await GenerosService.getGenerosFavoritosByUserId(userId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos los géneros favoritos obtenidos
            return res.status(response.code).json(response);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al obtener los géneros favoritos: " + error.message });
        }
    }

    //agregamos un género favorito
    static addGeneroFavorito = async (req, res) => {
        const userId = req.user.id; //obtenemos el id del usuario desde el token de autenticación
        const { generoId } = req.body; //obtenemos el id del género desde el cuerpo de la solicitud
        try {
            //llamamos al servicio para agregar el género favorito
            const response = await GenerosService.addGeneroFavorito(userId, generoId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el resultado de la operación
            return res.status(response.code).json(response.data);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al agregar el género favorito: " + error.message });
        }
    }

    //eliminamos un género favorito
    static removeGeneroFavorito = async (req, res) => {
        const userId = req.user.id; //obtenemos el id del usuario desde el token de autenticación
        const generoId = req.params.id; //obtenemos el id del género desde el cuerpo de la solicitud
        try {
            //llamamos al servicio para eliminar el género favorito
            const response = await GenerosService.removeGeneroFavorito(userId, generoId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el resultado de la operación
            return res.status(response.code).json(response.data);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al eliminar el género favorito: " + error.message });
        }
    }

    //eliminamos todos los géneros favoritos de un usuario
    static removeAllGenerosFavoritos = async (req, res) => {
        const userId = req.user.id; //obtenemos el id del usuario desde el token de autenticación
        try {
            //llamamos al servicio para eliminar todos los géneros favoritos
            const response = await GenerosService.removeAllGenerosFavoritos(userId);
            //verificamos si hay un error
            if (response.error) {
                return res.status(response.code).json({ message: response.message });
            }
            //retornamos el resultado de la operación
            return res.status(response.code).json(response.data);
        } catch (error) {
            //en caso de error, retornamos un mensaje de error
            return res.status(500).json({ message: "Error al eliminar los géneros favoritos: " + error.message });
        }
    }
}

export default GenerosController;
