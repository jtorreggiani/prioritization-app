import React from 'react';

function TimeframeSelect ({ timeframe, onChange }) {
  return (
    <select value={timeframe} onChange={onChange}>
      <option value="">Any</option>
      <option value="overdue">Overdue</option>
      <option value="today">Today</option>
      <option value="week">Next 7 days</option>
      <option value="month">Next 30 days</option>
    </select>
  )
}

export default TimeframeSelect;
