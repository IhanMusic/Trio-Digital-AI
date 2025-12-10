import { useState, useMemo } from 'react';

interface UseFiltersOptions<T> {
  data: T[];
  searchFields?: (keyof T)[];
  filterFunctions?: Record<string, (item: T, value: any) => boolean>;
}

export function useFilters<T>({ data, searchFields = [], filterFunctions = {} }: UseFiltersOptions<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchQuery && searchFields.length > 0) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query);
          }
          if (Array.isArray(value)) {
            return value.some(v => 
              typeof v === 'string' && v.toLowerCase().includes(query)
            );
          }
          return false;
        })
      );
    }

    // Apply custom filters
    Object.entries(activeFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
        const filterFn = filterFunctions[filterKey];
        if (filterFn) {
          result = result.filter(item => filterFn(item, filterValue));
        }
      }
    });

    return result;
  }, [data, searchQuery, activeFilters, searchFields, filterFunctions]);

  const setFilter = (key: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilter = (key: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0 || searchQuery !== '';

  return {
    searchQuery,
    setSearchQuery,
    activeFilters,
    setFilter,
    clearFilter,
    clearAllFilters,
    filteredData,
    hasActiveFilters,
    totalCount: data.length,
    filteredCount: filteredData.length
  };
}
