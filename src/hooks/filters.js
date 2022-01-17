import React, { useState } from 'react';
import { getFilterData, saveFilterData } from '../utils/local-storage';

export function useFilterStore () {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(getFilterData());

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
    filters,
    onSearchChange,
    onSearchKeyDown,
    submitSearch,
    set: (key, value) => {
      filters[key] = value;

      setFilters({ ...filters });
      saveFilterData({ ...filters });
    },
  }
}
