import React, { useState } from 'react';
import { loadProjectString } from '../utils/local-storage';

const DEFAULT_FILTERS = Object.freeze({
  query: '',
  status: 'incomplete',
  dateRange: '',
  priority: 'highest-priority',
  project: '',
});

export function useFilters () {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

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
      setFilters({...filters, [key]: value });
    },
    onSearchChange,
    onSearchKeyDown,
    submitSearch,
  }
}
