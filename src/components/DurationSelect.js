import React from 'react';

function DurationSelect ({
  duration,
  onChange,
  defaultOption = { value: '', label: 'None' },
}) {
  return (
    <select className="task-select" value={duration} onChange={(e) => onChange(e)}>
      <option value={defaultOption.value}>{defaultOption.label}</option>
      <option value="1">1 minute</option>
      <option value="5">5 minutes</option>
      <option value="15">15 minutes</option>
      <option value="30">30 minutes</option>
      <option value="45">45 minutes</option>
      <option value="60">1 hour</option>
      <option value="120">2 hours</option>
      <option value="240">4 hours</option>
      <option value="480">8 hours</option>
      <option value="1440">1 day</option>
      <option value="2880">2 days</option>
    </select>
  )
}

export default DurationSelect
