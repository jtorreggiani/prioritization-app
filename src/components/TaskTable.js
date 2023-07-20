import React, { useContext } from 'react';
import TaskRow from './TaskRow';
import { FiltersContext } from '../contexts/filters';

export function TaskTableHead ({ columns, toggleColumn }) {
  return (
    <thead>
      <tr>
        {Object.keys(columns).map(key => (
          <th key={key} width="0.5px" style={{minWidth: '0px'}}>
            { columns[key].visible ? columns[key].label : '+' }
          </th>
        ))}
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
  const {
    taskStore,
    filterStore: { filters },
  } = useContext(FiltersContext);

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
  const {
    taskStore,
    filterStore: { filters, columns, toggleColumn },
  } = useContext(FiltersContext);

  return (
    <div className="overflow-x-scroll">
      <table>
        <TaskTableHead columns={columns} toggleColumn={toggleColumn} />
        <TaskTableBody
          columns={columns}
          tasks={taskStore.where(filters)}
        />
        <TaskTableFoot />
      </table>
    </div>
  )
}

export default TaskTable;
