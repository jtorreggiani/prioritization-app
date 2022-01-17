import React from 'react';

function PriorityFilterSelect ({ priority, onChange }) {
  return (
    <select value={priority} onChange={(e) => onChange(e)}>
      <option value="highest-priority">Highest Priority</option>
      <option value="most-urgent">Most Urgent</option>
      <option value="most-important">Most Important</option>
      <option value="due-date">Due Date</option>
      <option value="least-urgent">Least Urgent</option>
      <option value="least-important">Least Important</option>
      <option value="lowest-priority">Lowest Priority</option>
    </select>
  )
}

export default PriorityFilterSelect
