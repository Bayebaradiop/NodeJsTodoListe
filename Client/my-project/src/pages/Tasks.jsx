import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TasksContext.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import TasksContents from '../components/TasksContents.jsx';
import TaskForm from '../components/TaskForm.jsx';
import Navbar from '../components/Navbar.jsx';

const Tasks = () => {
  const { 
    userTasks, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    updateTaskState,
    fetchUserTasks 
  } = useTasks();
  const { user } = useAuth();
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateNew = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de la tâche');
      }
    }
  };

  const handleUpdateState = async (taskId, newState) => {
    try {
      await updateTaskState(taskId, newState);
    } catch (error) {
      console.error('Erreur lors du changement d\'état:', error);
      alert('Erreur lors du changement d\'état');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);
      
      if (editingTask) {
        await updateTask(editingTask.id, formData);
      } else {
        await createTask(formData);
      }
      
      setShowTaskForm(false);
      setEditingTask(null);
      
      // Rafraîchir les données
      await fetchUserTasks();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Erreur lors de la sauvegarde de la tâche');
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  // Vérifier si l'utilisateur peut modifier/supprimer une tâche
  const canModifyTask = (task) => {
    return task.userId === user?.id || 
           task.allowedUsers?.some(allowedUser => (allowedUser.id || allowedUser.userId) === user?.id);
  };

  // Filtrer les tâches modifiables pour les actions
  const tasksWithActions = userTasks.map(task => ({
    ...task,
    canModify: canModifyTask(task)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mes Tâches
          </h1>
          <p className="text-gray-600">
            Gérez vos tâches et celles auxquelles vous avez accès
          </p>
        </div>



        {/* Contenu principal */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <TasksContents
              tasks={tasksWithActions}
              loading={loading}
              error={error}
              showActions={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onUpdateState={handleUpdateState}
              onCreateNew={handleCreateNew}
            />
          </div>
        </div>
      </div>

      {/* Modal de formulaire */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={formLoading}
        />
      )}
    </div>
  );
};

export default Tasks;
