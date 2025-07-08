
import { getData, logout, setData } from "../helpers/auth";

export const fetchConTokenRenovado = async (url, opciones = {}) => {
  let { accessToken, refreshToken } = getData();

  // Añadir accessToken a los headers
  opciones.headers = {
    ...opciones.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(url, opciones);

  // Si el token expiró, intentamos renovar automáticamente
  if (response.status === 401 || response.status === 403) {
    console.warn("Token expirado. Renovando con refreshToken...");

    const refreshResponse = await fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
    });

    const refreshData = await refreshResponse.json();

    if (!refreshResponse.ok || refreshData.error) {
      console.error("No se pudo renovar el token:", refreshData.message);
      logout();
      return response; // Ya no reintenta
    }

    // Guardar nuevos tokens
    setData(refreshData.data);

    // Reintentar la petición original con el nuevo accessToken
    opciones.headers.Authorization = `Bearer ${refreshData.data.accessToken}`;
    response = await fetch(url, opciones);
  }

  return response;
};
