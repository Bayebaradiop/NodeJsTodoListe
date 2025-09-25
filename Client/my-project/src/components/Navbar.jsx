import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { LogOut, User, Home, ListTodo, BarChart3 } from 'lucide-react';
import Button from './Button.jsx';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et navigation principale */}
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <ListTodo className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TodoApp</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/tasks" 
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                <ListTodo className="h-4 w-4" />
                <span>Mes Tâches</span>
              </Link>
              <Link 
                to="/history" 
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Historique</span>
              </Link>
            </div>
          </div>

          {/* Menu utilisateur */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">{user?.nom} {user?.prenom}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation mobile */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-white"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/tasks" 
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-white"
          >
            <ListTodo className="h-5 w-5" />
            <span>Mes Tâches</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
