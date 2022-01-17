import React from 'react';
import StatusSelect from './StatusSelect';
import TimeframeSelect from './TimeframeSelect';

function TaskFilters ({ filters, createTask }) {
  return (
    <div className="header">
      <div className="search-bar">
        <input
          type="text"
          style={{ width: '80%'}}
          onChange={filters.onSearchChange}
          onKeyDown={filters.onSearchKeyDown}
        />
        <button onClick={filters.submitSearch}>Search</button>
        <button onClick={createTask}>Create Task</button>
      </div>

      <div className="filter-input-group">
        <div className="filter-input">
          <label>Timeframe</label>
          <TimeframeSelect
            dateRange={filters.dateRange}
            onChange={filters.onDateFilterChange}
          />
        </div>

        <div className="filter-input">
          <label>Status</label>
          <StatusSelect
            status={filters.status}
            onChange={filters.onStatusFilterChange}
            showIncomplete="true"
          />
        </div>
      </div>
    </div>
  )
}

export default TaskFilters;
