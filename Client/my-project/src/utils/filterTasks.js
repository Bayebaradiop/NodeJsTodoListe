// Utility to filter tasks by search term and status
export function filterTasks(tasks = [], { searchTerm = '', statusFilter = 'all' } = {}) {
  const term = String(searchTerm || '').trim().toLowerCase();

  return tasks.filter((task) => {
    const titre = String(task.titre || '').toLowerCase();
    const description = String(task.description || '').toLowerCase();

    const matchesSearch = term === '' || titre.includes(term) || description.includes(term);
    const matchesStatus = statusFilter === 'all' || task.etat === statusFilter;

    return matchesSearch && matchesStatus;
  });
}

export default { filterTasks };
