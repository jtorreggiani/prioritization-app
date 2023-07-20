import React from 'react';

function StatusSelect ({ status, onChange, showIncomplete = false }) {
  return (
    <select value={status} onChange={onChange} className="task-select">
      { showIncomplete && <option value="incomplete">Incomplete</option> }
      <option value="planned">Planned</option>
      <option value="scheduled">Scheduled</option>
      <option value="in-progress">In Progress</option>
      <option value="paused">Paused</option>
      <option value="blocked">Blocked</option>
      <option value="delegated">Delegated</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  )
}

export default StatusSelect;
