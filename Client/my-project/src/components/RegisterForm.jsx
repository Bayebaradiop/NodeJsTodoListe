import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import Button from './Button.jsx';
import Input from './Input.jsx';

const RegisterForm = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

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
    
    if (!formData.nom.trim()) {
      errors.nom = 'Le nom est requis';
    }
    
    if (!formData.prenom.trim()) {
      errors.prenom = 'Le prénom est requis';
    }
    
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
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirmer le mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
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
      // Enlever confirmPassword avant d'envoyer
      const { confirmPassword, ...dataToSend } = formData;
      await register(dataToSend);
      setSuccess(true);
      
      // Rediriger vers la page de connexion après 2 secondes
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Inscription réussie !</h2>
          <p className="text-gray-600">Votre compte a été créé avec succès.</p>
          <p className="text-sm text-gray-500 mt-2">Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Inscription</h2>
        <p className="mt-2 text-gray-600">Créez votre compte TodoApp</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
            <Input
              label="Nom"
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              error={formErrors.nom}
              placeholder="Votre nom"
              className="pl-10"
              
            />
          </div>

          <div className="relative">
            <User className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
            <Input
              label="Prénom"
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              error={formErrors.prenom}
              placeholder="Votre prénom"
              className="pl-10"
            />
          </div>
        </div>

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

        <div className="relative">
          <Lock className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
          <Input
            label="Confirmer le mot de passe"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
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
          {loading ? 'Création du compte...' : 'Créer mon compte'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Déjà un compte ?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
