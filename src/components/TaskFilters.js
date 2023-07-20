import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import StatusSelect from './StatusSelect';
import TimeframeSelect from './TimeframeSelect';
import PriorityFilterSelect from './PriorityFilterSelect';
import ProjectFilterSelect from './ProjectFilterSelect';
import DurationSelect from './DurationSelect';
import { FiltersContext } from '../contexts/filters';

export function ModalContent({ onClose }) {
  const { filterStore: { columns, toggleColumn } } = useContext(FiltersContext);
  return (
    <div className="modal">
      <div className="modal-container">
        <ul className="column-select">
          {Object.keys(columns).map(key => (
            <li key={key}>
              <input
                type="checkbox"
                checked={columns[key].visible}
                onChange={() => toggleColumn(key)}
                style={{ display: 'inline-block' }}
              />
              <label style={{ display: 'inline-block' }}>{columns[key].label}</label>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function ColumnSettings() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Column Settings
      </button>
      {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}

function TaskFilters () {
  const { filterStore, taskStore } = useContext(FiltersContext);
  const { filters } = filterStore;

  return (
    <div className="header">
      <div className="search-bar">
        <input
          type="text"
          style={{ width: '80%'}}
          onChange={filterStore.onSearchChange}
          onKeyDown={filterStore.onSearchKeyDown}
        />
        <button onClick={filterStore.submitSearch}>Search</button>
        <button onClick={() => {
          taskStore.createTask(filters)
        }}>
          Create Task
        </button>
      </div>

      <div className="filter-input-group">
        <div className="filter-input">
          <label>Timeframe</label>
          <TimeframeSelect
            timeframe={filters.timeframe}
            onChange={(e) => filterStore.set('timeframe', e.target.value)}
          />
        </div>

        <div className="filter-input">
          <label>Status</label>
          <StatusSelect
            status={filters.status}
            onChange={(e) => filterStore.set('status', e.target.value)}
            showIncomplete="true"
          />
        </div>

        <div className="filter-input">
          <label>Prioritization</label>
          <PriorityFilterSelect
            priority={filters.priority}
            onChange={(e) => filterStore.set('priority', e.target.value)}
          />
        </div>

        <div className="filter-input">
          <label>Duration</label>
          <DurationSelect
            project={filters.duration}
            onChange={(e) => filterStore.set('duration', e.target.value)}
            defaultOption={{ value: '', label: 'Any'}}
          />
        </div>

        <div className="filter-input">
          <ProjectFilterSelect
            value={filters.project}
            onChange={(e) => filterStore.set('project', e.target.value)}
            default={{ value: 'any', label: 'Any'}}
          />
        </div>

        <div className="filter-input">
          <ColumnSettings />
        </div>
      </div>
    </div>
  )
}

export default TaskFilters;
