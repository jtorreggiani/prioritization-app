import React from 'react';
import PrioritySelect from './PrioritySelect';
import StatusSelect from './StatusSelect';
import ProjectSelect from './ProjectSelect';
import DurationSelect from './DurationSelect';

function TaskRow ({ task }) {
  return (
    <tr>
      <td className="title-column">
        <input
          style={{ width: '95%' }}
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
          onChange={(e) => task.set('status', e.target.value)}
        />
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
        <button onClick={task.remove}>🗑️</button>
        <button onClick={task.duplicate}>➕</button>
      </td>
    </tr>
  )
}

export default TaskRow;
