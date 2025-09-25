import { useState, useEffect } from 'react';
import { User, Mail, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import Navbar from '../components/Navbar.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Implémenter la mise à jour du profil via l'API
    console.log('Données à sauvegarder:', formData);
    setIsEditing(false);
    // Ici, vous devriez appeler une fonction pour mettre à jour le profil
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || ''
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mon Profil
          </h1>
          <p className="text-gray-600">
            Gérez vos informations personnelles
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          {/* En-tête */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-3">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.prenom} {user.nom}
                </h2>
                <p className="text-sm text-gray-500">
                  Membre depuis {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Modifier</span>
              </Button>
            )}
          </div>

          {/* Contenu */}
          <div className="px-6 py-6">
            {isEditing ? (
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nom"
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                  />
                  
                  <Input
                    label="Prénom"
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                  />
                </div>

                <Input
                  label="Adresse email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                />

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Annuler</span>
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Sauvegarder</span>
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Nom
                    </label>
                    <p className="text-lg text-gray-900">{user.nom}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Prénom
                    </label>
                    <p className="text-lg text-gray-900">{user.prenom}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Adresse email
                  </label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <p className="text-lg text-gray-900">{user.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    ID utilisateur
                  </label>
                  <p className="text-lg text-gray-900">#{user.id}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Informations importantes
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Votre ID utilisateur est utilisé pour partager l'accès aux tâches</li>
            <li>• Les propriétaires de tâches peuvent vous donner accès en utilisant votre ID</li>
            <li>• Vos informations sont sécurisées et privées</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
