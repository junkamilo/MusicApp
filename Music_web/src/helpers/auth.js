export const setData = (data) => {
  console.log("Tokens recibidos:", data);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
};

export const getData = () => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

export const estaAutenticado = () => {
  return !!localStorage.getItem("accessToken");
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  const footerPlayer = document.getElementById("footerPlayer");
  const audio = document.getElementById("audioPlayer");

  if (footerPlayer) {
    footerPlayer.classList.add("hidden");
  }

  if (audio) {
    audio.pause();
    audio.src = "";
  }

  window.dispatchEvent(new Event("usuario:logout"));

  window.location.hash = "#Login";
};
