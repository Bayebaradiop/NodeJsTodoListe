import { useEffect, useState } from 'react';
import { historyService } from '../services/history.js';

export default function useHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    historyService.getAll()
      .then((data) => {
        if (mounted) setHistory(data);
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  return { history, loading, error };
}
