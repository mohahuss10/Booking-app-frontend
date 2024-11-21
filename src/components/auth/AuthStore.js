// src/store/authStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: (token) => {
    set({
      token,
      isAuthenticated: true,
    });

    // Persist token to local storage
    localStorage.setItem('token', token);
  },

  logout: () => {
    // Clear Zustand store
    set({
      token: null,
      isAuthenticated: false,
    });

    // Clear token from local storage
    localStorage.removeItem('token');
  },
}));

export default useAuthStore;
