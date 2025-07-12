import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import ArtistasRouters from './src/routes/ArtistasRouters.js';
import AlbumRouters from './src/routes/AlbumRouters.js';
import CancionRouters from './src/routes/CancionRouters.js';
import GenerosRouters from './src/routes/GenerosRouters.js';
import authRutas from './src/routes/authRutas.js';
import protectedRoutes from './src/routes/protectedRoutes.js';
import AudioRouter from './src/routes/Audio.js';
import playlistRouters from './src/routes/playlistRouters.js';


// Importamos dotenv para manejar las variables de entorno
dotenv.config();

//creamos la instancia de express
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//habilitamos el cors
app.use(cors());

// Configuramos body-parser para que el app acepte datos JSON
app.use(bodyParser.json());

// Permite el envio de datos de formularios de tipo utlencode
app.use(express.urlencoded({ extended: true }));

// Permite manejar cookies en las respuestas.
app.use(cookieParser());

app.use('/artistas', ArtistasRouters);
app.use('/albumes', AlbumRouters);
app.use('/canciones', CancionRouters);
app.use('/generosMusicales', GenerosRouters);
app.use('/auth',authRutas);
app.use('/playlists', playlistRouters);
app.use("/api", protectedRoutes);
app.use('/api', AudioRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log("📂 Servidor sirviendo archivos desde:", path.join(__dirname, "uploads"));




//puerto en el que se ejecutara la aplicacion
const PORT = process.env.PORT || 3000;
// Iniciamos el servidor   
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});




