import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  userList: [],
  message: "",
  loading: false,
  error: "",

  fetchUserList: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ message: "Token no disponible. Por favor, inicia sesión." });
      return;
    }

    try {
      set({ loading: true });
      const response = await axios.get('https://backend-2ktb.onrender.com/api/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      set({ userList: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching UserList:', error);
      set({ error: "Error al obtener la lista de usuarios. Por favor, intenta de nuevo.", loading: false });
    }
  },
  createUser: async (userData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ message: "Token no disponible. Por favor, inicia sesión." });
      return;
    }

    try {
      const response = await axios.post('https://backend-2ktb.onrender.com/api/users', userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      set((state) => ({
        userList: [...state.userList, response.data],
        message: "Usuario creado con éxito"
      }));
    } catch (error) {
      console.error('Error creating user:', error);
      set({ error: "Error al crear usuario. Por favor, intenta de nuevo." });
    }
  },

  updateUser: async (id, updatedUser) => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ message: "Token no disponible. Por favor, inicia sesión." });
      return;
    }

    try {
      const response = await axios.put(`https://backend-2ktb.onrender.com/api/users/${id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      set((state) => ({
        userList: state.userList.map(user => user._id === id ? response.data : user),
        message: "Usuario actualizado con éxito"
      }));
    } catch (error) {
      console.error('Error updating user:', error);
      set({ error: "Error al actualizar usuario. Por favor, intenta de nuevo." });
    }
  },

  deleteUser: async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ message: "Token no disponible. Por favor, inicia sesión." });
      return;
    }

    try {
      await axios.delete(`https://backend-2ktb.onrender.com/api/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      set((state) => ({
        userList: state.userList.filter(user => user._id !== id),
        message: "Usuario eliminado con éxito"
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
      set({ error: "Error al eliminar usuario. Por favor, intenta de nuevo." });
    }
  },

  logoutUser: () => {
    localStorage.removeItem('token');
    set({ token: null, isLoggedIn: false, userList: [], message: "Sesión cerrada" });
  },
}));

export default useUserStore;
