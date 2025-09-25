// Fonctions utilitaires pour l'application

/**
 * Formate une date en chaîne lisible en français
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formate une date avec l'heure
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Tronque un texte à une longueur donnée
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

/**
 * Valide un email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Génère une couleur basée sur une chaîne (pour les avatars par exemple)
 */
export const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
    '#ec4899', '#f43f5e'
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Génère les initiales d'un nom complet
 */
export const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return 'NN';
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last;
};

/**
 * Formate la taille d'un fichier en unités lisibles
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Débounce une fonction (utile pour les recherches)
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Classes CSS conditionnelles (similaire à classnames)
 */
export const cn = (...classes) => {
  return classes
    .filter(Boolean)
    .join(' ');
};

/**
 * Vérifie si l'utilisateur a les permissions pour modifier une tâche
 */
export const canModifyTask = (task, user) => {
  if (!task || !user) return false;
  
  // Propriétaire de la tâche
  if (task.userId === user.id) return true;
  
  // Utilisateur autorisé
  if (task.allowedUsers?.some(allowedUser => (allowedUser.id || allowedUser.userId) === user.id)) {
    return true;
  }
  
  return false;
};

/**
 * Obtient le statut d'une tâche avec des informations de style
 */
export const getTaskStatus = (etat) => {
  const statuses = {
    'ENCOURS': {
      label: 'En cours',
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200'
    },
    'TERMINER': {
      label: 'Terminé',
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    }
  };
  
  return statuses[etat] || {
    label: 'Inconnu',
    color: 'gray',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-200'
  };
};

/**
 * Gère les erreurs d'API de manière uniforme
 */
export const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.status === 401) {
    return 'Vous n\'êtes pas autorisé à effectuer cette action';
  }
  
  if (error.response?.status === 403) {
    return 'Accès refusé';
  }
  
  if (error.response?.status === 404) {
    return 'Ressource non trouvée';
  }
  
  if (error.response?.status >= 500) {
    return 'Erreur serveur. Veuillez réessayer plus tard.';
  }
  
  return 'Une erreur est survenue';
};

/**
 * Storage local sécurisé
 */
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Erreur lors de la lecture du localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erreur lors de l\'écriture dans le localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erreur lors de la suppression du localStorage:', error);
    }
  }
};
