import { useAuth as useAuthContext } from '../context/AuthContext.jsx';

// Re-export du hook d'authentification pour centraliser l'usage
export const useAuth = () => {
  return useAuthContext();
};
