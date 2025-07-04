export const setData = (data) => {
  console.log("Tokens recibidos:", data);
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
};

export const getData = () => {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  };
};

export const estaAutenticado = () => {
  return !!localStorage.getItem('accessToken');
};

// Cierra sesión del usuario (logout)
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.dispatchEvent(new Event("usuario:logout"));
  window.location.hash = "#Login"; // Redirige al login
};
