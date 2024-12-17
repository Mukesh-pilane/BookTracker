import { create } from 'zustand';
import { loginUser } from '../api/services/authService';
import { devtools } from 'zustand/middleware';


const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    login: async (user) => {
        set({ loading: true, error: null });  // Set loading state
        try {
          const response = await loginUser(user);
          if (response?.authToken) {
            set({ user: response.user, loading: false });
            localStorage.setItem('authUser', JSON.stringify(response));
          } else {
            set({ error: "Authentication failed", loading: false });
          }
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
}));

export default useAuthStore;