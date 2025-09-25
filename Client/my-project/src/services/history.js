import api from './api.js';

export const historyService = {
  // Récupère l'historique des actions sur les tâches
  getAll: async () => {
    const response = await api.get('/tasks/history/all');
    return response.data;
  },
};
