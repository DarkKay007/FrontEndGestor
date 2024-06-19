import {jwtDecode} from 'jwt-decode';
const getToken = () => localStorage.getItem("token");

const decodeToken = () => {
  const token = getToken();
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  } else {
    console.error("No token found");
    return null;
  }
};

const isTokenExpired = () => {
  const decodedToken = decodeToken();
  if (decodedToken) {
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp < currentTime;
  }
  return true; // Consider token expired if it cannot be decoded
};

const getUserIdFromToken = () => {
  if (isTokenExpired()) {
    console.error("Token has expired");
    return null;
  }
  const decodedToken = decodeToken();
  return decodedToken ? decodedToken.id : null; // Asegúrate de que el campo `id` esté en el token
};

const isAdmin = () => {
  if (isTokenExpired()) {
    console.error("Token has expired");
    return false;
  }
  const decodedToken = decodeToken();
  return decodedToken ? decodedToken.rol === "Administrador" : false;
};

const isUser = () => {
  if (isTokenExpired()) {
    console.error("Token has expired");
    return false;
  }
  const decodedToken = decodeToken();
  return decodedToken ? decodedToken.rol === "Usuario" : false;
};

const hasNoToken = () => {
  return !getToken();
};

const getUserDataFromToken = () => {
  if (isTokenExpired()) {
    console.error("Token has expired");
    return null;
  }
  const decodedToken = decodeToken();
  return decodedToken || null;
};

export { getUserIdFromToken, isAdmin, isUser, hasNoToken, getUserDataFromToken, isTokenExpired };
