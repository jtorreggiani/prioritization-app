import React from 'react';

function PrioritySelect ({ priority, fieldName, onChange }) {
  return (
    <select value={priority} onChange={(e) => onChange(e, fieldName)}>
      <option value="critical">Critical</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
  )
}

export default PrioritySelect
