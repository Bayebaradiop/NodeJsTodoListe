import { useState, useEffect } from 'react';
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import TaskCard from './TaskCard.jsx';
import Button from './Button.jsx';
import Input from './Input.jsx';
import { filterTasks } from '../utils/filterTasks.js';
import { useSearchParams } from 'react-router-dom';
import { getPageFromSearchParams, setPageInSearchParams, paginateArray } from '../utils/paginator.js';

const TasksContents = ({ tasks = [], loading = false, error = null, showActions = false, onEdit, onDelete, onUpdateState, onCreateNew }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(() => getPageFromSearchParams(searchParams));
  const tasksPerPage = 3;

  const filtered = filterTasks(tasks, { searchTerm, statusFilter });
  const { totalPages, currentTasks, startIndex, endIndex } = paginateArray(filtered, page, tasksPerPage);

  // Mettre à jour la page si elle change dans l'URL
  useEffect(() => {
    const p = getPageFromSearchParams(searchParams);
    if (p !== page) setPage(p);
  }, [searchParams]);

  const changePage = (p) => {
    setPage(p);
    setPageInSearchParams(searchParams, setSearchParams, p);
  };

  const handleSearch = (e) => { setSearchTerm(e.target.value); changePage(1); };
  const handleFilter = (e) => { setStatusFilter(e.target.value); changePage(1); };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}<Button variant="outline" onClick={() => window.location.reload()}>Réessayer</Button></div>;

  return (
    <div className="space-y-6">
      {/* Recherche + filtre + nouveau */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="text" placeholder="Rechercher..." value={searchTerm} onChange={handleSearch} className="pl-10" />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select value={statusFilter} onChange={handleFilter} className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">Tous</option>
              <option value="ENCOURS">En cours</option>
              <option value="TERMINER">Terminé</option>
            </select>
          </div>
        </div>
        {onCreateNew && <Button onClick={onCreateNew} className="flex items-center gap-2"><Plus className="h-4 w-4" />Nouvelle tâche</Button>}
      </div>

      {/* Compteur */}
      <div className="flex justify-between text-sm text-gray-600">
        <div>{filtered.length} tâche{filtered.length !== 1 ? 's' : ''} {searchTerm && `pour "${searchTerm}"`}</div>
        {totalPages > 1 && <div>Page {page} sur {totalPages} • Affichage de {startIndex + 1} à {Math.min(endIndex, filtered.length)} sur {filtered.length}</div>}
      </div>

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchTerm || statusFilter !== 'all' ? 'Aucune tâche ne correspond à vos critères' : 'Aucune tâche trouvée'}
          {onCreateNew && <Button onClick={onCreateNew} variant="outline">Créer votre première tâche</Button>}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTasks.map(t => <TaskCard key={t.id} task={t} showActions={showActions} onEdit={onEdit} onDelete={onDelete} onUpdateState={onUpdateState} />)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button variant="outline" onClick={() => changePage(page - 1)} disabled={page === 1} className="flex items-center gap-1"><ChevronLeft className="h-4 w-4" />Précédent</Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
                  return <Button key={p} variant={p === page ? 'primary' : 'outline'} onClick={() => changePage(p)} className="w-10 h-10 p-0">{p}</Button>;
                } else if (p === page - 2 || p === page + 2) {
                  return <span key={p} className="px-2 text-gray-400">...</span>;
                }
                return null;
              })}
              <Button variant="outline" onClick={() => changePage(page + 1)} disabled={page === totalPages} className="flex items-center gap-1">Suivant<ChevronRight className="h-4 w-4" /></Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TasksContents;
