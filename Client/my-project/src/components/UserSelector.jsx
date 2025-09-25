import { useState } from 'react';
import { User, Search } from 'lucide-react';
import { useUsers } from '../hooks/useUsers.jsx';

const UserSelector = ({ onSelect, excludeUserIds = [] }) => {
  const { users, loading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  // Filtrer les utilisateurs disponibles
  const availableUsers = users.filter(user => 
    !excludeUserIds.includes(user.id) &&
    (user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    onSelect(userId);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Liste des utilisateurs */}
      <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
        {availableUsers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {searchTerm ? 'Aucun utilisateur trouvé' : 'Aucun utilisateur disponible'}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {availableUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user.id)}
                className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedUserId === user.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.nom}
                      </p>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        ID: {user.id}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  {selectedUserId === user.id && (
                    <div className="flex-shrink-0">
                      <div className="h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSelector;
