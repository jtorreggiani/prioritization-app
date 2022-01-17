import React from 'react';

function StatusSelect ({ dateRange, onChange }) {
  return (
    <select value={dateRange} onChange={onChange}>
      <option value="any">Anytime</option>
      <option value="overdue">Overdue</option>
      <option value="today">Today</option>
      <option value="week">Next 7 days</option>
      <option value="month">Next 30 days</option>
    </select>
  )
}

export default StatusSelect;
