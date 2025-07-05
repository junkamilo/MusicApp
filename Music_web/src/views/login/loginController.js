import "./login.css";
import { error, success } from "../../helpers/alerts.js";
import { setData } from "../../helpers/auth.js";

export const loginController = () => {

  const container = document.querySelector(".container");

  // Botones para cambiar entre formularios
  const signInBtn = document.querySelector("#sign-in-btn");
  const signUpBtn = document.querySelector("#sign-up-btn");

  signUpBtn?.addEventListener("click", () => {
    container?.classList.add("sign-up-mode");
  });

  signInBtn?.addEventListener("click", () => {
    container?.classList.remove("sign-up-mode");
  });

  //ingresamos a login
  const loginForm = document.querySelector("#form-login");
  const loginEmail = document.querySelector("#email");
  const loginPassword = document.querySelector("#password");

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: loginEmail?.value?.trim(),
      contrasena: loginPassword?.value,
    };

    if (!data.email || !data.contrasena) {
      error({ message: "Por favor completa todos los campos de login." });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      });

      const respuesta = await res.json();
      console.log("📥 Respuesta login:", respuesta);

      if (!respuesta.error) {
        success(respuesta.message || "Inicio de sesión exitoso");
        setData(respuesta.data);
        window.dispatchEvent(new Event("usuario:logueado"));
        window.location.hash = "#/";
      } else {
        error(respuesta.message || "Credenciales inválidas");
      }
    } catch (ex) {
      error({ message: "Error de conexión con el servidor." });
    }
  });

  //ingresamos a registro
  const registerForm = document.querySelector("#form-register");
  const registerName = document.querySelector("#register-username");
  const registerEmail = document.querySelector("#register-email");
  const registerPassword = document.querySelector("#register-password");

  registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre: registerName?.value?.trim(),
      email: registerEmail?.value?.trim(),
      contrasena: registerPassword?.value,
    };

    if (!data.nombre || !data.email || !data.contrasena) {
      error({ message: "Por favor completa todos los campos de registro." });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      });

      const respuesta = await res.json();
      console.log("📥 Respuesta registro:", respuesta);

      if (!respuesta.error) {
        // Forzar visualmente el modo login
        container?.classList.remove("sign-up-mode");

        // Mostrar mensaje de éxito
        success(respuesta.message || "Registro exitoso");

        // Limpiar campos del formulario de registro
        registerName.value = "";
        registerEmail.value = "";
        registerPassword.value = "";

        // Opcional: enfocar campo de email en el login
        loginEmail?.focus();

        // Redirigir a login (si usas rutas)
        window.location.hash = "#Login";
      } else {
        error(respuesta.message || "No se pudo registrar");
      }
    } catch (ex) {
      error({ message: "Error de conexión con el servidor." });
    }
  });
};
