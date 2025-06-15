import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ArtistasRouters from './src/routes/ArtistasRouters.js';

// Importamos dotenv para manejar las variables de entorno
dotenv.config();

//creamos la instancia de express
const app = express();

//habilitamos el cors
app.use(cors());

// Configuramos body-parser para que el app acepte datos JSON
app.use(bodyParser.json());

// Permite el envio de datos de formularios de tipo utlencode
app.use(express.urlencoded({ extended: true }));

// Permite manejar cookies en las respuestas.
app.use(cookieParser());

app.use('/artistas', ArtistasRouters);

//puerto en el que se ejecutara la aplicacion
const PORT = process.env.PORT || 3000;
// Iniciamos el servidor   
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});




