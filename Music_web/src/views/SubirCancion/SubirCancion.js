// views/SubirCancion.js

import { uploadSong } from "../../components/uploadSong/uploadSong";


export const SubirCancion = () => {
  const contenedor = document.getElementById("app");

  if (!contenedor) {
    console.error("No se encontró el contenedor principal.");
    return;
  }

  uploadSong(contenedor);
};
