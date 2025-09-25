import { Link } from 'react-router-dom';
import { Calendar, User, Eye, Edit, Trash2, Clock, CheckCircle, Volume2 } from 'lucide-react';
import Button from './Button.jsx';

const TaskCard = ({ task, showActions = false, onEdit, onDelete, onUpdateState }) => {
  const getStateColor = (etat) => {
    switch (etat) {
      case 'ENCOURS':
        return 'bg-yellow-100 text-yellow-800';
      case 'TERMINER':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStateIcon = (etat) => {
    switch (etat) {
      case 'ENCOURS':
        return <Clock className="h-4 w-4" />;
      case 'TERMINER':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* En-tête de la carte */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {task.titre}
        </h3>
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStateColor(task.etat)}`}>
          {getStateIcon(task.etat)}
          <span className="ml-1">{task.etat}</span>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Photo */}
      {task.photo && (
        <div className="mb-4">
          <img 
            src={`http://localhost:3000${task.photo}`} 
            alt={task.titre}
            className="w-full h-32 object-cover rounded-md"
          />
        </div>
      )}

      {/* Audio */}
      {task.audio && (
        <div className="mb-4 flex items-center space-x-2 border p-2 rounded-md">
          <Volume2 className="h-4 w-4 text-gray-600" />
          <audio controls src={`http://localhost:3000${task.audio}`} className="flex-1" />
        </div>
      )}

      {/* Dates de la tâche */}
      {(task.startDate || task.endDate) && (
        <div className="mb-4 space-y-1">
          {task.startDate && (
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Calendar className="h-4 w-4" />
              <span>Début: {new Date(task.startDate).toLocaleString('fr-FR')}</span>
            </div>
          )}
          {task.endDate && (
            <div className="flex items-center space-x-2 text-sm text-red-600">
              <Calendar className="h-4 w-4" />
              <span>Fin: {new Date(task.endDate).toLocaleString('fr-FR')}</span>
            </div>
          )}
        </div>
      )}

      {/* Durée de la tâche */}
      {task.duration && (
        <div className="mb-4 flex items-center space-x-2 text-sm text-blue-600">
          <Clock className="h-4 w-4" />
          <span>Durée: {task.duration}</span>
        </div>
      )}

      {/* Informations utilisateur et date */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <User className="h-3 w-3" />
          <span>{task.user?.nom} {task.user?.prenom}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3" />
          <span>{new Date(task.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>

      {/* Indicateur d'auto-complétion */}
      {task.autoCompleted && (
        <div className="mb-4 flex items-center space-x-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
          <CheckCircle className="h-3 w-3" />
          <span>Terminée automatiquement (date d'échéance dépassée)</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Link to={`/tasks/${task.id}`}>
          <Button size="sm" variant="outline" className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>Voir</span>
          </Button>
        </Link>

        {showActions && (
          <div className="flex space-x-2">
            {task.etat === 'ENCOURS' && onUpdateState && (
              <Button
                size="sm"
                variant="success"
                onClick={() => onUpdateState(task.id, 'TERMINER')}
                className="flex items-center space-x-1"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Terminer</span>
              </Button>
            )}
            
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(task)}
                className="flex items-center space-x-1"
              >
                <Edit className="h-4 w-4" />
                <span>Modifier</span>
              </Button>
            )}
            
            {onDelete && (
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(task.id)}
                className="flex items-center space-x-1"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
