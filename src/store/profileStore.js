// src/store/profileStore.js
import {create} from 'zustand';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const useProfileStore = create((set) => ({
  user: null,
  isLoading: false,
  userId: null,
  fetchUser: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      set({ userId });

      set({ isLoading: true });
      try {
        const response = await axios.get(
          `https://backend-2ktb.onrender.com/api/profile/${userId}`
        );
        set({ user: response.data });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      set({ isLoading: false });
    } else {
      console.error("No token found");
    }
  },
  updateUser: async (updatedUserData) => {
    const { userId } = useProfileStore.getState();
    if (!userId) return;

    try {
      await axios.post(
        `https://backend-2ktb.onrender.com/api/profile/${userId}`,
        updatedUserData
      );
      set((state) => ({
        user: { ...state.user, ...updatedUserData },
      }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
}));

export default useProfileStore;
