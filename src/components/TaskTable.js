import React from 'react';
import TaskRow from './TaskRow';

function TaskTable ({ tasks }) {
  return (
    <table>
      <colgroup>
        <col span={1} width="40%" />
        <col span={1} />
        <col span={1} />
        <col span={1} />
        <col span={1} />
        <col span={1} />
      </colgroup>

      <thead>
        <tr>
          <th>Task</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Urgency</th>
          <th>Importance</th>
          <th>Tags</th>
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
