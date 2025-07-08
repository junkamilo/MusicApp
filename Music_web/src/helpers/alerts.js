import Swal from "sweetalert2";

export const error = (data) => {
  Swal.fire({
    title: "Cuidado!",
    text: data.message,
    icon: "error",
    confirmButtonText: "Cool",
  });
};

export const success = (data) =>{
  Swal.fire({
    icon: "success",
    title: "¡Éxito!",
    text: data.mensaje,
    timer: 1500,
    showConfirmButton: false,
  });
}

export const AgregadoGenerosFavoritos = (nombreGenero) => {
  Swal.fire({
    title: "¡Agregado!",
    text: `El género musical ${nombreGenero} fue agregado a favoritos`,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
}

export const AgregadoArtistasFavoritos = (nombreArtista) => {
  Swal.fire({
    title: "¡Agregado!",
    text: `El Artista ${nombreArtista} fue agregado a favoritos`,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
}