import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const checkAuth = async () => {
      // Éviter de vérifier plusieurs fois
      if (initialized) return;
      
      try {
        const userData = await authService.getCurrentUser();
        // Extraire les données utilisateur si elles sont dans un wrapper
        const actualUser = userData.data || userData;
        setUser(actualUser);
      } catch (error) {
        // Ne pas loguer l'erreur si c'est juste une 401 (non authentifié)
        if (error.response?.status !== 401) {
          console.error('Erreur lors de la vérification d\'authentification:', error);
        }
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    checkAuth();
  }, [initialized]);

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const userData = await authService.login(credentials);
      // Extraire les données utilisateur si elles sont dans un wrapper
      const actualUser = userData.data || userData;
      setUser(actualUser);
      return actualUser;
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur de connexion');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur d\'inscription');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
