import api from './api.js';

export const tasksService = {
  getAllTasks: async () => {
  const response = await api.get('/tasks');
  return response.data?.data ?? response.data;
  },

  getUserTasks: async () => {
  const response = await api.get('/tasks/tasksuser');
  return response.data?.data ?? response.data;
  },

  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const formData = new FormData();
    
    Object.keys(taskData).forEach(key => {
      if (key !== 'photo') {
        formData.append(key, taskData[key]);
      }
    });

    if (taskData.photo) {
      formData.append('photo', taskData.photo);
    }

    const response = await api.post('/tasks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const formData = new FormData();
    
    Object.keys(taskData).forEach(key => {
      if (key !== 'photo') {
        formData.append(key, taskData[key]);
      }
    });

    if (taskData.photo) {
      formData.append('photo', taskData.photo);
    }

    const response = await api.put(`/tasks/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  addPermission: async (taskId, userId) => {
    const response = await api.post(`/tasks/${taskId}/permission`, { userId });
    return response.data;
  },

  updateTaskState: async (taskId, etat) => {
    const response = await api.patch(`/tasks/${taskId}/etat`, { etat });
    return response.data;
  },
};
