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
export const EliminadoArtistasFavoritos = (nombreArtista) => {
  Swal.fire({
    title: "Eliminado",
    text: `El artista ${nombreArtista} fue eliminado de tus favoritos`,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
};
export const confirmarEliminacion = async (nombreArtista) => {
  return Swal.fire({
    title: `¿Eliminar a ${nombreArtista}?`,
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });
};
export const EliminadoGeneroFavorito = (nombreGenero) => {
  Swal.fire({
    title: "Eliminado",
    text: `El género ${nombreGenero} fue eliminado de tus favoritos`,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
};
export const confirmarEliminacionGenero = async (nombreGenero) => {
  return Swal.fire({
    title: `¿Eliminar a ${nombreGenero}?`,
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });
};
// Confirmación antes de eliminar todos
export const confirmarEliminarTodosGeneros = async () => {
  return Swal.fire({
    title: "¿Eliminar todos los géneros favoritos?",
    text: "Esta acción eliminará todos tus géneros favoritos y no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar todos",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });
};

// Alerta después de eliminar todos
export const EliminadosTodosGeneros = () => {
  Swal.fire({
    title: "Eliminados",
    text: "Todos los géneros favoritos han sido eliminados",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
};

//Alerts de albumes
export const AgregadoAlbumFavorito = (nombreAlbum) => {
  Swal.fire({
    title: "¡Agregado!",
    text: `El álbum "${nombreAlbum}" fue agregado a favoritos`,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
};
// Alerta después de eliminar todos los álbumes
export const EliminadoTodosAlbumesFavoritos = () => {
  Swal.fire({
    title: "Eliminados",
    text: "Todos los álbumes favoritos han sido eliminados",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
};
//Alerta despues de eliinar todos los albumes
export const EliminadoAlbumFavorito = (albumName) => {
  Swal.fire({
    title: "Eliminado",
    text: `El album ${albumName} fue eliminado de tus favoritos`,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
};
// Confirmación antes de eliminar todos los álbumes favoritos
export const confirmarEliminarTodosAlbumes = async () => {
  return Swal.fire({
    title: "¿Eliminar todos los géneros favoritos?",
    text: "Esta acción eliminará todos tus géneros favoritos y no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar todos",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });
};
// Confirmación antes de eliminar un álbum favorito
export const confirmarEliminarAlbum = async (nombreAlbum) => {
  return Swal.fire({
    title: `¿Eliminar a ${nombreAlbum}?`,
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });
};

//Alerts de canciones
export const AgregadoCancionFavorita = (nombreCancion) => {
  Swal.fire({
    title: "¡Agregado!",
    text: `La canción "${nombreCancion}" fue agregada a favoritos`,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
};
// Alerta después de eliminar todos las canciones favoritas
export const EliminadoTodosCancionesFavoritas = () => {
  Swal.fire({
    title: "Eliminados",
    text: "Todos las canciones favoritas han sido eliminadas",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
};
//Alerta despues de eliminar una cancion favorita
export const EliminadoCancionFavorita = (cancionName) => {
  Swal.fire({
    title: "Eliminado",
    text: `La canción ${cancionName} fue eliminada de tus favoritos`,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
};
// Confirmación antes de eliminar todas las canciones favoritas
export const confirmarEliminarTodasCanciones = async () => {
  return Swal.fire({
    title: "¿Eliminar todas las canciones favoritas?",
    text: "Esta acción eliminará todas tus canciones favoritas y no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar todos",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });
};
// Confirmación antes de eliminar una canción favorita
export const confirmarEliminarCancion = async (nombreCancion) => {
  return Swal.fire({
    title: `¿Eliminar a ${nombreCancion}?`,
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });
};
export const AgregadoCancionFavoritos = (nombreCancion) => {
  Swal.fire({
    title: "¡Agregado!",
    text: `la canción ${nombreCancion} fue agregada a favoritos`,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });
}

export const confirmAction = async (options) => {
    const result = await Swal.fire({
        title: options.title || "¿Estás seguro?",
        text: options.message,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2ED162",
        cancelButtonColor: "#d33",
        confirmButtonText: options.confirmText || "Sí",
        cancelButtonText: options.cancelText || "Cancelar",
        reverseButtons: true,
        customClass: {
            popup: 'swal2-confirmation-popup',
            confirmButton: 'swal2-confirm-button',
            cancelButton: 'swal2-cancel-button'
        }
    });

    return result.isConfirmed;
};