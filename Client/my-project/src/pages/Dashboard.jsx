import { useState, useEffect } from 'react';
import { useTasks } from '../context/TasksContext.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import TasksContents from '../components/TasksContents.jsx';
import Navbar from '../components/Navbar.jsx';

const Dashboard = () => {
  const { tasks, loading, error, fetchAllTasks } = useTasks();
  const { user } = useAuth();



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            Bienvenue {user?.prenom}, voici un aperçu de toutes les tâches
          </p>
        </div>

        {/* Section des tâches récentes */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Toutes les tâches
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Vue d'ensemble de toutes les tâches dans le système
            </p>
          </div>
          <div className="p-6">
            <TasksContents
              tasks={tasks}
              loading={loading}
              error={error}
              showActions={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
