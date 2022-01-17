import React from 'react';

function StatusSelect ({ status, onChange }) {
  return (
    <select value={status} onChange={onChange}>
      <option value="incomplete">Incomplete</option>
      <option value="planned">Planned</option>
      <option value="in-progress">In Progress</option>
      <option value="blocked">Blocked</option>
      <option value="delegated">Delegated</option>
      <option value="completed">Completed</option>
    </select>
  )
}

export default StatusSelect;
