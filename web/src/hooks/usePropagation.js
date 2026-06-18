import { useState, useEffect } from 'react';
import { getPropagation } from '../api/client';

export function usePropagation(genre, year) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!genre || !year) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    getPropagation(genre, year)
      .then(setData)
      .catch(err => {
        console.error('Erro ao buscar propagação:', err);
        setError(err.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [genre, year]);

  return { data, loading, error };
}