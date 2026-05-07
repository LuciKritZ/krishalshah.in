import { useEffect, useMemo, useState } from 'react';

export interface FilterConfig<T> {
  apiFetchFn?: (query: string, filters: string[]) => Promise<T[]>;
  debounceMs?: number;
  initialData?: T[];
  localFilterFn?: (item: T, filters: string[]) => boolean;
  localSearchFn?: (item: T, query: string) => boolean;
  mode: 'api' | 'local';
}

export function useDataFilter<T>({
  apiFetchFn,
  debounceMs = 300,
  initialData,
  localFilterFn,
  localSearchFn,
  mode,
}: FilterConfig<T>) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [data, setData] = useState<T[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (mode === 'api' && apiFetchFn) {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const result = await apiFetchFn(query, filters);
          setData(result);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to fetch'));
        } finally {
          setIsLoading(false);
        }
      };

      const timer = setTimeout(() => {
        fetchData();
      }, debounceMs);

      return () => clearTimeout(timer);
    }
  }, [query, filters, mode, debounceMs, apiFetchFn]);

  const results = useMemo(() => {
    if (mode === 'api') return data;

    return data.filter(item => {
      const matchSearch = localSearchFn
        ? query
          ? localSearchFn(item, query)
          : true
        : true;
      const matchFilter = localFilterFn
        ? filters.length > 0
          ? localFilterFn(item, filters)
          : true
        : true;
      return matchSearch && matchFilter;
    });
  }, [data, query, filters, mode, localSearchFn, localFilterFn]);

  const toggleFilter = (filter: string) => {
    setFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const clearFilters = () => setFilters([]);

  return {
    clearFilters,
    data,
    error,
    filters,
    isLoading,
    query,
    results,
    setData,
    setFilters,
    setQuery,
    toggleFilter,
  };
}
