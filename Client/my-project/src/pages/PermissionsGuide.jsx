import { Link } from 'react-router-dom';
import { ArrowLeft, User, UserPlus, Eye, Edit, Shield, Info } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Button from '../components/Button.jsx';

const PermissionsGuide = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link 
            to="/tasks" 
            className="inline-flex items-center text-blue-600 hover:text-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour aux tâches
          </Link>
        </div>

        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Guide des Permissions</h1>
              <p className="text-gray-600">Apprenez à partager vos tâches avec d'autres utilisateurs</p>
            </div>
          </div>
        </div>

        {/* Comment ça marche */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-600" />
            Comment ça marche
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Vous êtes propriétaire</h3>
                  <p className="text-sm text-gray-600">Quand vous créez une tâche, vous en êtes automatiquement le propriétaire.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Ajoutez des collaborateurs</h3>
                  <p className="text-sm text-gray-600">Vous pouvez donner la permission à d'autres utilisateurs de voir et modifier vos tâches.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Collaboration</h3>
                  <p className="text-sm text-gray-600">Les utilisateurs autorisés peuvent modifier l'état, le contenu et ajouter des commentaires.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">💡 Astuce</h3>
              <p className="text-sm text-blue-700">
                Seul le propriétaire d'une tâche peut ajouter ou retirer des permissions. 
                Les collaborateurs ne peuvent pas inviter d'autres utilisateurs.
              </p>
            </div>
          </div>
        </div>

        {/* Étapes pour ajouter des permissions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <UserPlus className="h-5 w-5 mr-2 text-green-600" />
            Étapes pour ajouter des permissions
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">1. Accédez aux détails de votre tâche</h3>
                <p className="text-sm text-gray-600">Cliquez sur le bouton "Voir" sur une de vos tâches.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">2. Cliquez sur "Ajouter utilisateur"</h3>
                <p className="text-sm text-gray-600">Ce bouton n'est visible que si vous êtes le propriétaire de la tâche.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">3. Sélectionnez un utilisateur</h3>
                <p className="text-sm text-gray-600">Choisissez dans la liste des utilisateurs disponibles ou recherchez par nom/email.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <Edit className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">4. Confirmez l'ajout</h3>
                <p className="text-sm text-gray-600">L'utilisateur peut maintenant voir et modifier votre tâche.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions accordées */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Que peuvent faire les utilisateurs autorisés ?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-green-700 font-medium mb-3">✅ Ils peuvent :</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Voir tous les détails de la tâche</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Modifier le titre et la description</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Changer l'état (En cours ↔ Terminé)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Ajouter ou modifier des photos</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-red-700 font-medium mb-3">❌ Ils ne peuvent pas :</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Supprimer la tâche</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Ajouter d'autres utilisateurs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Retirer des permissions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Changer le propriétaire</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bouton d'action */}
        <div className="text-center">
          <Link to="/tasks">
            <Button className="inline-flex items-center space-x-2">
              <span>Commencer à partager mes tâches</span>
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PermissionsGuide;
