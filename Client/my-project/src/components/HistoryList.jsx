import React from 'react';
import useHistory from '../hooks/useHistory.jsx';

export default function HistoryList() {
  const { history, loading, error } = useHistory();

  if (loading) return <div>Chargement de l'historique...</div>;
  if (error) return <div>Erreur: {error.message || String(error)}</div>;

  if (!history || history.length === 0) return <div>Aucun historique trouvé.</div>;

  return (
    <div className="space-y-4">
      {history.map((entry) => (
        <div key={entry.id} className="p-4 border rounded">
          <div className="font-semibold">{entry.action} - {new Date(entry.createdAt).toLocaleString()}</div>
          <div className="text-sm text-gray-600">Détails: {entry.details || '—'}</div>

          <div className="mt-2">
            <div className="font-medium">Tâche :</div>
            <div>Titre: {entry.task?.titre}</div>
            <div>Description: {entry.task?.description}</div>
          </div>

          <div className="mt-2">
            <div className="font-medium">Utilisateur :</div>
            <div>{entry.user?.nom} ({entry.user?.email})</div>
          </div>
        </div>
      ))}
    </div>
  );
}
