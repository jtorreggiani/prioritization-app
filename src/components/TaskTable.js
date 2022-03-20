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
        <th>Date</th>
        <th>Time</th>
        <th>Urgency</th>
        <th>Importance</th>
        <th>Duration</th>
        <th>Actions</th>
      </tr>
    </thead>
  )
}

export function TaskTableBody ({ tasks }) {
  return (
    <tbody>
      {tasks.map(task => <TaskRow key={task.id} task={task} /> )}
    </tbody>
  )
}

function TaskTable () {
  const { taskStore, filterStore: { filters } } = useContext(FiltersContext);

  return (
    <table>
      <TaskTableHead />
      <TaskTableBody tasks={taskStore.where(filters)} />
    </table>
  )
}

export default TaskTable;
