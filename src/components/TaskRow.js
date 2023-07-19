import React from 'react';
import PrioritySelect from './PrioritySelect';
import StatusSelect from './StatusSelect';
import ProjectSelect from './ProjectSelect';
import DurationSelect from './DurationSelect';
import * as dayjs from 'dayjs';

function actualDurationInMinutes (task) {
  if (!task.startedAt || !task.completedAt) {
    return null;
  }
  const startedAt = new Date(task.startedAt);
  const completedAt = new Date(task.completedAt);
  const duration = completedAt - startedAt;
  return Math.round(duration / 1000 / 60);
}

function TaskRow ({ task }) {
  return (
    <tr>
      <td className="title-column">
        <input
          className="title-input"
          type="text"
          value={task.title}
          onChange={(e) => task.set('title', e.target.value)}
        />
      </td>
      <td>
        <ProjectSelect
          value={task.project}
          onChange={(e) => task.set('project', e.target.value)}
        />
      </td>
      <td>
        <StatusSelect
          status={task.status}
          onChange={(e) => {
            task.set('status', e.target.value)
            if (e.target.value === 'completed') {
              task.set('completedAt', new Date().toISOString())
            }
            if (e.target.value === 'in-progress') {
              task.set('startedAt', new Date().toISOString())
            }
          }}/>
      </td>
      <td>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={(e) => task.set('dueDate', e.target.value)}
        />
      </td>
      <td>
        <input
          type="time"
          name="dueAt"
          value={task.dueAt}
          onChange={(e) => task.set('dueAt', e.target.value)}
        />
      </td>
      <td>
        { task.startedAt ? dayjs(task.startedAt).format('MM/DD/YYYY') : null }
      </td>
      <td>
        { task.startedAt ? dayjs(task.startedAt).format('HH:mm A') : null }
      </td>
      <td>
        <PrioritySelect
          task={task}
          fieldName="urgency"
          priority={task.urgency}
          onChange={(e) => task.set('urgency', e.target.value)}
        />
      </td>
      <td>
        <PrioritySelect
          task={task}
          fieldName="importance"
          priority={task.importance}
          onChange={(e) => task.set('importance', e.target.value)}
        />
      </td>
      <td>
        <DurationSelect
          duration={task.duration}
          onChange={(e) => task.set('duration', e.target.value)}
        />
      </td>
      <td>
        { actualDurationInMinutes(task) }
      </td>
      <td>
        <button onClick={task.remove}>🗑️</button>
        <button onClick={task.duplicate}>➕</button>
      </td>
    </tr>
  )
}

export default TaskRow;
