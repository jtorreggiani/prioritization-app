import React, { useState } from 'react';
import { getFilterData, saveFilterData } from '../utils/local-storage';

export function useFilterStore () {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(getFilterData());
  const [columns, setColumns] = useState({
    title: { label: 'Task', visible: true },
    project: { label: 'Project', visible: true },
    status: { label: 'Status', visible: true },
    plannedDate: { label: 'Planned Date', visible: true },
    plannedTime: { label: 'Planned Time', visible: true },
    urgency: { label: 'Urgency', visible: true },
    importance: { label: 'Importance', visible: true },
    estimate: { label: 'Estimate', visible: true },
    startDate: { label: 'Start Date', visible: true },
    startTime: { label: 'Start Time', visible: true },
    actual: { label: 'Actual', visible: true },
    actions: { label: 'Actions', visible: true },
  });

  function toggleColumn(key) {
    columns[key].visible = !columns[key].visible;
    setColumns({ ...columns });
  }

  // function onSearchChange (e: React.ChangeEvent<HTMLInputElement>) {
  function onSearchChange (e) {
    setQuery(e.target.value);
  }

  function refresh() {
    setFilters({ ...filters });
  }

  function submitSearch () {
    setFilters({ ...filters, query });
  }

  // function onSearchKeyDown (e: React.KeyboardEvent<HTMLInputElement>) {
  function onSearchKeyDown (e) {
    if (e.keyCode !== 13) return;
    submitSearch();
  }

  return {
    filters,
    columns,
    onSearchChange,
    onSearchKeyDown,
    submitSearch,
    refresh,
    toggleColumn,
    set: (key, value) => {
      filters[key] = value;
      setFilters({ ...filters });
      saveFilterData({ ...filters });
    },
  }
}
