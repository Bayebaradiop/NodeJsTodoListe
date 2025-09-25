import { createContext, useContext, useState, useEffect } from 'react';
import { tasksService } from '../services/tasks.js';
import { useAuth } from './AuthContext.jsx';

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer toutes les tâches
  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksService.getAllTasks();
      setTasks(data);
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la récupération des tâches');
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les tâches de l'utilisateur
  const fetchUserTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksService.getUserTasks();
      setUserTasks(data);
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la récupération de vos tâches');
    } finally {
      setLoading(false);
    }
  };

  // Créer une nouvelle tâche
  const createTask = async (taskData) => {
    try {
      setError(null);
      const newTask = await tasksService.createTask(taskData);
      setUserTasks(prev => [...prev, newTask]);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la création de la tâche');
      throw error;
    }
  };

  // Mettre à jour une tâche
  const updateTask = async (taskId, taskData) => {
    try {
      setError(null);
      const updatedTask = await tasksService.updateTask(taskId, taskData);
      
      // Mettre à jour dans les deux listes
      setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
      setUserTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
      
      return updatedTask;
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la mise à jour de la tâche');
      throw error;
    }
  };

  // Supprimer une tâche
  const deleteTask = async (taskId) => {
    try {
      setError(null);
      await tasksService.deleteTask(taskId);
      
      // Supprimer des deux listes
      setTasks(prev => prev.filter(task => task.id !== taskId));
      setUserTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la suppression de la tâche');
      throw error;
    }
  };

  // Ajouter une permission
  const addPermission = async (taskId, userId) => {
    try {
      setError(null);
      const result = await tasksService.addPermission(taskId, userId);
      // Recharger les tâches pour avoir les permissions mises à jour
      await fetchAllTasks();
      await fetchUserTasks();
      return result;
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de l\'ajout de permission');
      throw error;
    }
  };

  // Changer l'état d'une tâche
  const updateTaskState = async (taskId, etat) => {
    try {
      setError(null);
      const updatedTask = await tasksService.updateTaskState(taskId, etat);
      
      // Mettre à jour dans les deux listes
      setTasks(prev => prev.map(task => task.id === taskId ? updatedTask.data : task));
      setUserTasks(prev => prev.map(task => task.id === taskId ? updatedTask.data : task));
      
      return updatedTask;
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors du changement d\'état');
      throw error;
    }
  };

  // Charger les données au montage si authentifié
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllTasks();
      fetchUserTasks();
    }
  }, [isAuthenticated]);

  // Vérification automatique des tâches expirées côté frontend (toutes les 30 secondes)
  useEffect(() => {
    if (!isAuthenticated || userTasks.length === 0) return;

    const checkExpiredTasks = async () => {
      const now = new Date();
      const expiredTasks = userTasks.filter(task =>
        task.etat !== 'TERMINER' &&
        task.endDate &&
        new Date(task.endDate) < now
      );

      if (expiredTasks.length > 0) {
        console.log(`📅 Frontend: ${expiredTasks.length} tâche(s) expirée(s) détectée(s)`);

        for (const task of expiredTasks) {
          try {
            await updateTaskState(task.id, 'TERMINER');
            console.log(`✅ Frontend: Tâche ${task.id} (${task.titre}) marquée comme terminée`);
          } catch (error) {
            console.error(`❌ Frontend: Erreur lors de la complétion de la tâche ${task.id}:`, error);
          }
        }
      }
    };

    // Vérifier immédiatement au montage
    checkExpiredTasks();

    // Puis vérifier toutes les 30 secondes
    const interval = setInterval(checkExpiredTasks, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, userTasks, updateTaskState]);

  const value = {
    tasks,
    userTasks,
    loading,
    error,
    fetchAllTasks,
    fetchUserTasks,
    createTask,
    updateTask,
    deleteTask,
    addPermission,
    updateTaskState,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};
