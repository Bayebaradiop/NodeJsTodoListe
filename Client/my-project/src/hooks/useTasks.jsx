import { useEffect, useState } from 'react';
import api from '../services/api.js';

export function useTasks({ page = 1, limit = 6, search = '', status = 'all' } = {}) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const params = { page, limit };
    if (search) params.search = search;
    if (status && status !== 'all') params.status = status;

    api.get('/tasks', { params })
      .then((res) => {
        if (!mounted) return;
        const body = res.data || {};
        setData(body.data || []);
        setTotal(body.total || 0);
        setTotalPages(body.totalPages || 1);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [page, limit, search, status]);

  return { data, total, totalPages, loading, error };
}

export default useTasks;
