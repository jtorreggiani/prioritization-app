import { useState, useEffect, useContext } from 'react';
import PrioritySelect from './PrioritySelect';
import StatusSelect from './StatusSelect';
import ProjectSelect from './ProjectSelect';
import DurationSelect from './DurationSelect';
import CollapsibleData from './CollapsibleData';
import { calculateActualDuration, actualDurationInSeconds, humanizeDuration } from '../utils/duration';
import * as dayjs from 'dayjs';
import { FiltersContext } from '../contexts/filters';

function CountUpTimer({ task }) {
  const [seconds, setSeconds] = useState(actualDurationInSeconds(task));
  const { filterStore: { filters } } = useContext(FiltersContext);

  useEffect(() => {
    let timeoutId;

    if (task.status === 'in-progress') {
      timeoutId = setInterval(() => {
        setSeconds(actualDurationInSeconds(task));
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [task.status]);

  return <span>{humanizeDuration(seconds)}</span>;
}

function TaskRow ({ task }) {
  const { taskStore } = useContext(FiltersContext);
  
  let className = '';
  if (task.status === 'in-progress') {
    className = 'in-progress-task';
  } else if (task.status === 'completed') {
    className = 'completed-task';
  } else {
    const isOverdue = dayjs(`${task.dueDate} ${task.dueAt}`).isBefore(dayjs());
    className = isOverdue ? `overdue-task` : className;
  }

  return (
    <tr className={className}>
      <CollapsibleData id="title" className="title-column">
        <input
          className="title-input"
          type="text"
          value={task.title}
          onChange={(e) => task.set('title', e.target.value)}
        />
      </CollapsibleData>
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
            calculateActualDuration(task, e.target.value);
            if (e.target.value === 'in-progress') {
              taskStore.pauseTasks(task.id);
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
          onChange={(e) => {
            task.set('duration', e.target.value)
          }}
        />
      </td>
      <CollapsibleData id="startDate">
        { task.startedAt ? dayjs(task.startedAt).format('MM/DD/YYYY') : null }
      </CollapsibleData>
      <CollapsibleData id="startTime">
        { task.startedAt ? dayjs(task.startedAt).format('hh:mm A') : null }
      </CollapsibleData>
      <CollapsibleData id="actual">
        <CountUpTimer task={task} />
      </CollapsibleData>
      <td>
        <button onClick={task.remove}>🗑️</button>
        <button onClick={task.duplicate}>➕</button>
      </td>
    </tr>
  )
}

export default TaskRow;
