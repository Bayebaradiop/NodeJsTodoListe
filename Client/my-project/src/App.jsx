import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { TasksProvider } from './context/TasksContext.jsx';
import { useAuth } from './hooks/useAuth.jsx';

// Pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tasks from './pages/Tasks.jsx';
import TaskDetail from './pages/TaskDetail.jsx';
import Profile from './pages/Profile.jsx';
import PermissionsGuide from './pages/PermissionsGuide.jsx';
import History from './pages/History.jsx';

// Composant pour protéger les routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Routes de l'application
const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Routes protégées */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/tasks" element={
        <ProtectedRoute>
          <Tasks />
        </ProtectedRoute>
      } />
      
      <Route path="/tasks/:id" element={
        <ProtectedRoute>
          <TaskDetail />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      <Route path="/permissions-guide" element={
        <ProtectedRoute>
          <PermissionsGuide />
        </ProtectedRoute>
      } />
      
      <Route path="/history" element={
        <ProtectedRoute>
          <History />
        </ProtectedRoute>
      } />
      
      {/* Redirection par défaut */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Route 404 */}
      <Route path="*" element={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600 mb-4">Page non trouvée</p>
            <a href="/dashboard" className="text-blue-600 hover:text-blue-500">
              Retour au tableau de bord
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <TasksProvider>
          <div className="App">
            <AppRoutes />
          </div>
        </TasksProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
