import { create } from 'zustand';
import { loginUser } from '../api/services/authService';


const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    login: async (user) => {
        const response = await loginUser(user)
        set(response?.authToken)
    }
}));

export default useAuthStore;