import "./login.css";
import { error, success } from "../../helpers/alerts.js";
import { setData } from "../../helpers/auth.js";

export const loginController = () => {
  console.log("✅ loginController cargado correctamente");

  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  if (!sign_in_btn || !sign_up_btn || !container) {
    console.warn("❌ Faltan elementos para alternar login/registro");
  }

  // Alternar entre formularios
  sign_up_btn?.addEventListener("click", () => {
    container?.classList.add("sign-up-mode");
    console.log("🟦 Modo registro activado");
  });

  sign_in_btn?.addEventListener("click", () => {
    container?.classList.remove("sign-up-mode");
    console.log("🟨 Modo login activado");
  });

  // Buscar elementos inmediatamente (sin esperar DOMContentLoaded)
  const form = document.querySelector("#form-login");
  const emailInput = document.querySelector("#form-login #email");
  const passwordInput = document.querySelector("#form-login #password");

  if (!form || !emailInput || !passwordInput) {
    console.error("❌ No se encontró el formulario o los inputs");
    return;
  }

  console.log("✅ Formulario login encontrado y listo");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: emailInput.value.trim(),
      contrasena: passwordInput.value.trim(),
    };

    console.log("📤 Enviando datos:", data);

    try {
      const solicitud = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      });

      const respuesta = await solicitud.json();
      console.log("📥 Respuesta del backend:", respuesta);

      if (respuesta.status === "success") {
        success(respuesta.message);
        
        setData(respuesta.data);

        window.dispatchEvent(new Event("usuario:logueado"));

        window.location.hash = "#/";
      } else {
        error(respuesta.message || "Credenciales inválidas");
      }
    } catch (err) {
      console.error("❌ Error de red:", err);
      error("No se pudo conectar al servidor");
    }
  });
};


