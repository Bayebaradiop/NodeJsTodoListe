import { useEffect, useState } from 'react';
import { useTasks } from '../context/TasksContext.jsx';
import { tasksService } from '../services/tasks.js';

export const useTasksEffect = () => {
  const { tasks, userTasks, loading, error } = useTasks();
  
  return {
    tasks,
    userTasks,
    loading,
    error,
  };
};

// Hook pour récupérer une tâche spécifique par ID
export const useTaskDetail = (taskId) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;
      
      try {
        setLoading(true);
        setError(null);
        const taskData = await tasksService.getTaskById(taskId);
        setTask(taskData);
      } catch (error) {
        setError(error.response?.data?.message || 'Erreur lors de la récupération de la tâche');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  return { task, loading, error, refetch: () => {
    if (taskId) {
      const fetchTask = async () => {
        try {
          setLoading(true);
          setError(null);
          const taskData = await tasksService.getTaskById(taskId);
          setTask(taskData);
        } catch (error) {
          setError(error.response?.data?.message || 'Erreur lors de la récupération de la tâche');
        } finally {
          setLoading(false);
        }
      };
      fetchTask();
    }
  } };
};
