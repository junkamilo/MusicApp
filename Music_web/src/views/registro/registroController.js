import { error, success } from "../../helpers/alerts.js";

export const registroController = () => {
  console.log("✅ registroController cargado correctamente");

  // Capturar el formulario de registro
  const form = document.querySelector(".sign-up-form");
  const nombreInput = document.querySelector("#register-username");
  const emailInput = document.querySelector("#register-email");
  const passwordInput = document.querySelector("#register-password");

  if (!form || !nombreInput || !emailInput || !passwordInput) {
    console.error("❌ No se encontró el formulario o los campos del registro");
    return;
  }

  console.log("✅ Formulario registro encontrado y listo");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre: nombreInput.value.trim(),
      email: emailInput.value.trim(),
      contrasena: passwordInput.value,
    };

    if (!data.nombre || !data.email || !data.contrasena) {
      error("Por favor, completa todos los campos.");
      return;
    }

    console.log("📤 Enviando datos de registro:", data);

    try {
      const solicitud = await fetch("http://localhost:3000/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      });

      const respuesta = await solicitud.json();
      console.log("📥 Respuesta del backend:", respuesta);

      if (respuesta.status === "success") {
        success(respuesta.message || "Registro exitoso");

        // Cambiar a modo login automáticamente
        const signInBtn = document.querySelector("#sign-in-btn");
        signInBtn?.click();

        // Resetear campos
        form.reset();
      } else {
        error(respuesta.message || "Error al registrarse");
      }
    } catch (err) {
      console.error("❌ Error de red:", err);
      error("No se pudo conectar al servidor");
    }
  });
};
