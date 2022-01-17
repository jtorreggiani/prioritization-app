import React from 'react';

function DurationSelect ({
  duration,
  onChange,
  defaultOption = { value: '', label: 'None' },
}) {
  return (
    <select className="task-select" value={duration} onChange={(e) => onChange(e)}>
      <option value={defaultOption.value}>{defaultOption.label}</option>
      <option value="one-minute">1 minute</option>
      <option value="five-minutes">5 minutes</option>
      <option value="10-minutes">15 minutes</option>
      <option value="30-minutes">30 minutes</option>
      <option value="45-minutes">45 minutes</option>
      <option value="1-hour">1 hour</option>
      <option value="2-hours">2 hours</option>
      <option value="4-hours">4 hours</option>
      <option value="1-day">1 day</option>
    </select>
  )
}

export default DurationSelect
