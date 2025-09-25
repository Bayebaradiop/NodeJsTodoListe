import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import Button from './Button.jsx';
import Input from './Input.jsx';

const LoginForm = ({ onSuccess }) => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur du champ modifié
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password) {
      errors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await login(formData);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
        <p className="mt-2 text-gray-600">Connectez-vous à votre compte</p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
          <Input
            label="Adresse email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            placeholder="votre@email.com"
            className="pl-10"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
          <Input
            label="Mot de passe"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            placeholder="••••••••"
            className="pl-10"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
