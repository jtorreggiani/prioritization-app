import React, { useState } from 'react';
import { loadFilters, saveFiltersToLocalStorage } from '../utils/local-storage';

export function useFilters () {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(loadFilters());

  function onSearchChange (e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function submitSearch () {
    setFilters({ ...filters, query });
  }

  function onSearchKeyDown (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode !== 13) return;
    submitSearch();
  }

  return {
    ...filters,
    set: (key, value) => {
      setFilters({ ...filters, [key]: value });
      saveFiltersToLocalStorage({ ...filters, [key]: value });
    },
    onSearchChange,
    onSearchKeyDown,
    submitSearch,
  }
}
