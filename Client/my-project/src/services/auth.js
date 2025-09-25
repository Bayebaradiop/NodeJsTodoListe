import api from './api.js';

export const authService = {
  // Inscription
  register: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Connexion
  login: async (credentials) => {
    const response = await api.post('/users/auth', credentials);
    return response.data;
  },

  // Déconnexion
  logout: async () => {
    const response = await api.post('/users/logout');
    return response.data;
  },

  // Récupérer l'utilisateur connecté
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // Récupérer tous les utilisateurs (pour les permissions)
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
};
