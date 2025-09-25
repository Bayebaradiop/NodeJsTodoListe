// paginator.js - fonctions simples pour pagination et URL

// Lire la page depuis l'URL
export function getPageFromSearchParams(searchParams, defaultPage = 1) {
  const raw = searchParams.get('page');
  const page = parseInt(raw || String(defaultPage), 10);
  return isNaN(page) || page < 1 ? defaultPage : page;
}


export function setPageInSearchParams(searchParams, setSearchParams, page) {
  // Crée une copie des paramètres actuels de l'URL
  const newParams = new URLSearchParams(searchParams);

  if (page <= 1) {
    // Si c'est la première page, on supprime le paramètre "page" pour une URL plus propre
    newParams.delete('page');
  } else {
    // Sinon, on met à jour ou ajoute le paramètre "page"
    newParams.set('page', page);
  }

  // Applique les nouveaux paramètres dans l'URL sans recharger la page
  setSearchParams(newParams, { replace: true });
}


// Paginer un tableau en mémoire
export function paginateArray(items = [], page = 1, perPage = 6) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, total);
  const currentTasks = items.slice(startIndex, endIndex);

  return { total, totalPages, currentPage, startIndex, endIndex, currentTasks };
}

export default { getPageFromSearchParams, setPageInSearchParams, paginateArray };
