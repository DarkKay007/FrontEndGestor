import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; // Asegúrate de que el campo `id` esté en el token
  } else {
    console.error("No token found");
    return null;
  }
};

export default getUserIdFromToken;
