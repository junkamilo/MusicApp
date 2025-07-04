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