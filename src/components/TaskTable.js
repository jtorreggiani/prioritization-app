import React, { useContext } from 'react';
import TaskRow from './TaskRow';
import { FiltersContext } from '../contexts/filters';

export function TaskTableHead () {
  return (
    <thead>
      <tr>
        <th>Task</th>
        <th>Project</th>
        <th>Status</th>
        <th>Planned Date</th>
        <th>Planned Time</th>
        <th>Start Date</th>
        <th>Start Time</th>
        <th>Urgency</th>
        <th>Importance</th>
        <th>Estimate</th>
        <th>Actual</th>
        <th>Actions</th>
      </tr>
    </thead>
  )
}

export function TaskTableBody ({ tasks }) {
  return (
    <>
      <tbody>
        {tasks.map(task => <TaskRow key={task.id} task={task} /> )}
      </tbody>
    </>
  )
}

export function TaskTableFoot () {
  const { taskStore, filterStore: { filters } } = useContext(FiltersContext);

  return (
    <tfoot>
      <tr>
        <td colSpan="12" style={{ textAlign: 'center' }}>
          <button
            style={{ width: '20%' }}
            onClick={() => taskStore.createTask(filters)}
          >
            Create Task
          </button>
        </td>
      </tr>
    </tfoot>
  )
}

function TaskTable () {
  const { taskStore, filterStore: { filters } } = useContext(FiltersContext);

  return (
    <div className="overflow-x-scroll">
      <table>
        <TaskTableHead />
        <TaskTableBody tasks={taskStore.where(filters)} />
        <TaskTableFoot />
      </table>
    </div>
  )
}

export default TaskTable;
