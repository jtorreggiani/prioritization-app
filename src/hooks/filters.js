import React, { useState } from 'react';

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

  function onDateFilterChange (e: React.ChangeEvent<HTMLSelectElement>) {
    setFilters({...filters, dateRange: e.target.value });
  }

  function onStatusFilterChange (e: React.ChangeEvent<HTMLSelectElement>) {
    setFilters({...filters, status: e.target.value });
  }

  function onPriorityFilterChange (e: React.ChangeEvent<HTMLSelectElement>) {
    setFilters({...filters, priority: e.target.value });
  }

  function onProjectFilterChange (e: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem('PROJECT_FILTERS', e.target.value);
  }

  function onSelectProjectFilter (e: React.ChangeEvent<HTMLInputElement>) {
    setFilters({...filters, project: e.target.value });
  }

  return {
    ...filters,
    onDateFilterChange,
    onPriorityFilterChange,
    onSearchChange,
    onSearchKeyDown,
    onStatusFilterChange,
    submitSearch,
    onProjectFilterChange,
    onSelectProjectFilter,
  }
}
