import { create } from 'zustand';
import { loginUser } from '../api/services/authService';


const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isAuth: true,
  error: null,

  login: async (user) => {
    set({ loading: true, error: null });  // Set loading state
    try {
      const response = await loginUser(user);
      if (response?.authToken) {
        set({ user: user.email, loading: false, isAuth:false });
        localStorage.setItem('authUser', JSON.stringify({ email: user.email, authToken: response.authToken, }));
      } else {
        set({ error: "Authentication failed", loading: false, });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useAuthStore;