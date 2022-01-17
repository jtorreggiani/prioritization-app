import React from 'react';
import TaskFilters from './components/TaskFilters';
import TaskTable from './components/TaskTable';
import { useFilters } from './hooks/filters';
import { useTasks } from './hooks/tasks';
import './App.css';

function App() {
  const tasks = useTasks();
  const filters = useFilters();

  return (
    <div className="App">
      <TaskFilters filters={filters} createTask={tasks.createTask} />
      <TaskTable tasks={tasks.where(filters)} />
    </div>
  );
}

export default App;
