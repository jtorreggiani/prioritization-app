import React from 'react';
import PrioritySelect from './PrioritySelect';
import StatusSelect from './StatusSelect';
import { calculateDueDate } from '../utils/dates';
import { calculateUrgencyForTask } from '../utils/filters';

function TaskRow ({ task }) {

  function onTitleChange (e: React.ChangeEvent<HTMLInputElement>, id: string) {
    task.set('title', e.target.value);
  }

  function onPriorityChange (e: React.ChangeEvent<HTMLSelectElement>, key: string) {
    task.setPriority(key, e.target.value);
  }

  function onDueDateChange (e: React.ChangeEvent<HTMLInputElement>, id: string) {
    task.setDueDate(e.target.value);
  }

  function onTagsChange (e: React.ChangeEvent<HTMLInputElement>) {
    task.set('tags', e.target.value);
  }

  function onStatusChange (e: React.ChangeEvent<HTMLSelectElement>, id: string) {
    task.set('status', e.target.value);
  }

  return (
    <tr>
      <td>
        <input
          style={{ width: '95%'}}
          type="text"
          value={task.title}
          onChange={(e) => onTitleChange(e, task.id)}
        />
      </td>
      <td>
        <StatusSelect
          status={task.status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            onStatusChange(e, task.id)
          }}
        />
      </td>
      <td>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={calculateDueDate(task)}
          onChange={(e) => onDueDateChange(e, task.id)}
        />
      </td>
      <td>
        <PrioritySelect
          task={task}
          fieldName="urgency"
          priority={calculateUrgencyForTask(task)}
          onChange={onPriorityChange}
        />
      </td>
      <td>
        <PrioritySelect
          task={task}
          fieldName="importance"
          priority={task.importance}
          onChange={onPriorityChange}
        />
      </td>
      <td>
        <input
          style={{ width: '95%'}}
          type="text"
          value={task.tags || ''}
          onChange={onTagsChange}
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
