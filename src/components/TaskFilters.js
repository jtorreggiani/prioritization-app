import React from 'react';
import StatusSelect from './StatusSelect';
import TimeframeSelect from './TimeframeSelect';
import PriorityFilterSelect from './PriorityFilterSelect';
import ProjectFilterSelect from './ProjectFilterSelect';
import DurationSelect from './DurationSelect';

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
            onChange={(e) => filters.set('dateRange', e.target.value)}
          />
        </div>

        <div className="filter-input">
          <label>Status</label>
          <StatusSelect
            status={filters.status}
            onChange={(e) => filters.set('status', e.target.value)}
            showIncomplete="true"
          />
        </div>

        <div className="filter-input">
          <label>Prioritization</label>
          <PriorityFilterSelect
            priority={filters.priority}
            onChange={(e) => filters.set('priority', e.target.value)}
          />
        </div>

        <div className="filter-input">
          <ProjectFilterSelect
            project={filters.project}
            onChange={(e) => filters.set('project', e.target.value)}
            onSave={(e) => filters.set('project', '')}
            default={{ value: 'any', label: 'Any'}}
          />
        </div>

        <div className="filter-input">
          <label>Duration</label>
          <DurationSelect
            project={filters.duration}
            onChange={(e) => filters.set('duration', e.target.value)}
            defaultOption={{ value: '', label: 'Any'}}
          />
        </div>
      </div>
    </div>
  )
}

export default TaskFilters;
