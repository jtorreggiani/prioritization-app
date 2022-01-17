import React from 'react';
import TaskRow from './TaskRow';

function TaskTable ({ tasks }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Project</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Urgency</th>
          <th>Importance</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map(task => <TaskRow key={task.id} task={task} /> )}
      </tbody>
    </table>
  )
}

export default TaskTable;
