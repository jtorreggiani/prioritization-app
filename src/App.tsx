import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const TASK_DATA_KEY = 'TASK_DATA';

const LOCAL_DATA = localStorage.getItem(TASK_DATA_KEY)
  ? JSON.parse(localStorage.getItem(TASK_DATA_KEY))
  : localStorage.setItem(TASK_DATA_KEY, '{}');

const PRIORITY_MAP = Object.freeze({
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
})


function SelectInput ({ task, fieldName, onChange }) {
  return (
    <select value={task[fieldName]} onChange={(e) => onChange(e, fieldName, task.id)}>
      <option value="critical">Critical</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
  )
}

function sortCompare (a, b) {
  const aPriority = PRIORITY_MAP[a.urgency] + PRIORITY_MAP[a.importance]
  const bPriority = PRIORITY_MAP[b.urgency] + PRIORITY_MAP[b.importance]

  if (aPriority > bPriority) {
    return 1;
  }

  if (aPriority < bPriority) {
    return -1;
  }

  return 0;
}

function zeroPaddedMonth(d) {
  const month = d.getMonth() + 1;
  return (month < 10 ? '0' : '') + month;
}

function zeroPaddedDate(d) {
  const day = d.getDate();
  return (day < 10 ? '0' : '') + day;
}

function calculateDueDate (todo) {
  if (todo.dueDate) return todo.dueDate

  const priority = PRIORITY_MAP[todo.urgency] + PRIORITY_MAP[todo.importance]

  const date = new Date();

  date.setDate(date.getDate() + priority)

  const dateString = `${date.getFullYear()}-${zeroPaddedMonth(date)}-${zeroPaddedDate(date)}`;

  return dateString
}

function newTodo () {
  const id = uuidv4()

  return {
    id,
    title: '',
    urgency: 'low',
    importance: 'low',
  }
}

function daysBetween(date1, date2) {
  const diff = date2.diff(date1, 'day')

  if (diff <= 0) return 0;

  return diff
}

function calculateUrgency (difference) {
  if (difference === 0) {
    return 'critical'
  } else if (difference === 1) {
    return 'high'
  } else if (difference === 2) {
    return 'medium'
  } else {
    return 'low'
  }
}

function searchFilter (task, filters) {
  if (filters.query === '' || !filters.query) return true

  const query = filters.query.toLowerCase()
  const title = task.title.toLowerCase()
  const tags = task.tags ? task.tags.toLowerCase() : ''

  return title.match(new RegExp(query)) || tags.match(new RegExp(query))
}

function dateFilter (task, filters) {
  const dueDate = calculateDueDate(task)
  const today = dayjs()
  const nextWeek =  dayjs().add(7, 'day')
  const nextMonth = dayjs().add(30, 'day')

  if (filters.dateRange === 'today') {
    return dayjs(dueDate).isSame(today, 'day')
  } else if (filters.dateRange === 'week') {
    return dayjs(dueDate).isBetween(today, nextWeek, 'day')
  } else if (filters.dateRange === 'month') {
    return dayjs(dueDate).isBetween(today, nextMonth, 'day')
  } else if (filters.dateRange === 'overdue') {
    return dayjs(dueDate).isBefore(today, 'day')
  } else {
    return true
  }
}

function statusFilter (task, filters) {
  const status = task.status || 'planned';

  if (filters.status === '') return true
  if (filters.status === 'planned') return status === 'planned'
  if (filters.status === 'in-progress') return status === 'in-progress'
  if (filters.status === 'completed') return status === 'completed'
  if (filters.status === 'incomplete') return status !== 'completed'
}

function filterTasks (tasksDB, filters) {
  return Object.keys(tasksDB)
               .map(key => { return { id: key, ...tasksDB[key] } })
               .filter(task => dateFilter(task, filters))
               .filter(task => searchFilter(task, filters))
               .filter(task => statusFilter(task, filters))
               .sort(sortCompare)
}

function App() {
  const [tasksDB, setTasks] = useState(LOCAL_DATA)
  const [filters, setFilters] = useState({
    query: '',
    status: 'incomplete',
  })

  function saveTasksDb (id, key, value) {
    tasksDB[id][key] = value
    window.localStorage.setItem('TASK_DATA', JSON.stringify(tasksDB))
    setTasks({ ...tasksDB })
  }

  function handlePriorityChange (e: React.FormEvent<HTMLInputElement>, key: string, id) {
    tasksDB[id]['dueDate'] = null
    saveTasksDb(id, key, e.target.value)
  }

  function handleTitleChange (e, id) {
    saveTasksDb(id, 'title', e.target.value)
  }

  function updateDueDate (e, id) {
    const difference = daysBetween(dayjs(), dayjs(e.target.value));
    const urgency = calculateUrgency(difference);

    tasksDB[id]['urgency'] = urgency;

    saveTasksDb(id, 'dueDate', e.target.value)
  }

  function handleTagsChange (e, id) {
    saveTasksDb(id, 'tags', e.target.value)
  }

  function addTodo () {
    const newTask = newTodo();
    tasksDB[newTask.id] = { id: newTask.id, ...newTask };
    window.localStorage.setItem('TASK_DATA', JSON.stringify(tasksDB));
    setTasks({...tasksDB});
  }

  function removeTodo (id) {
    delete tasksDB[id]
    setTasks({...tasksDB})
  }

  function handleSearch (e) {
    filters.query = e.target.value
    setFilters({...filters})
  }

  function toggleCompleteFilter () {
    filters.hideComplete = !filters.hideComplete
    setFilters({...filters})
  }

  function toggleCompleteFilter () {
    filters.hideComplete = !filters.hideComplete
    setFilters({...filters})
  }

  function onDateFilterChange (e) {
    setFilters({...filters, dateRange: e.target.value })
  }

  function onStatusFilterChange (e) {
    setFilters({...filters, status: e.target.value })
  }

  function onStatusChange (e, id) {
    saveTasksDb(id, 'status', e.target.value)
  }

  return (
    <div className="App">
      <div className="header">
        <div className="search-bar">
          <input type="text" style={{ width: '80%'}} onChange={handleSearch} />
          <button>Search</button>
          <button onClick={addTodo}>Create Task</button>
        </div>

        <div className="filter-input-group">
          <div className="filter-input">
            <label>Timeframe</label>
            <select value={filters.dateRange} onChange={onDateFilterChange}>
              <option value="any">Anytime</option>
              <option value="overdue">Overdue</option>
              <option value="today">Today</option>
              <option value="week">Next 7 days</option>
              <option value="month">Next 30 days</option>
            </select>
          </div>

          <div className="filter-input">
            <label>Status</label>
            <select value={filters.status} onChange={onStatusFilterChange}>
              <option value="incomplete">Incomplete</option>
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="blocked">Blocked</option>
              <option value="delegated">Delegated</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <table>
        <colgroup>
          <col span="1" width="50%" />
          <col span="1" width="10%" />
          <col span="1" width="5%" />
          <col span="1" width="5%" />
          <col span="1" />
          <col span="1" />
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
          {filterTasks(tasksDB, filters).map(task => {
            return (
              <tr>
                <td>
                  <input
                    style={{ width: '98%'}}
                    type="text"
                    value={task.title}
                    onChange={(e) => handleTitleChange(e, task.id)}
                  />
                </td>
                <td>
                  <select value={task.status} onChange={(e) => onStatusChange(e, task.id)}>
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="blocked">Blocked</option>
                    <option value="delegated">Delegated</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    style={{ width: '80%'}}
                    value={calculateDueDate(task)}
                    onChange={(e) => updateDueDate(e, task.id)}
                  />
                </td>
                <td><SelectInput fieldName="urgency" task={task} onChange={handlePriorityChange} /></td>
                <td><SelectInput fieldName="importance" task={task} onChange={handlePriorityChange} /></td>
                <td>
                  <input
                    style={{ width: '98%'}}
                    type="text"
                    value={task.tags || ''}
                    onChange={(e) => handleTagsChange(e, task.id)}
                  />
                </td>
                <td>
                  <button onClick={() => removeTodo(task.id)}>Remove</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
