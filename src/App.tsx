import React from 'react';
import TaskFilters from './components/TaskFilters';
import TaskStats from './components/TaskStats';
import TaskTable from './components/TaskTable';
import { useFilterStore } from './hooks/filters';
import { useTaskStore } from './hooks/tasks';
import { useProjectStore } from './hooks/projects';
import { FiltersContext } from './contexts/filters';

import './App.css';

function App() {
  const taskStore = useTaskStore();
  const filterStore = useFilterStore();
  const projectStore = useProjectStore();

  return (
    <div className="App">
      <FiltersContext.Provider value={{ taskStore, filterStore, projectStore }}>
        <TaskFilters />
        <TaskStats />
        <TaskTable />
      </FiltersContext.Provider>
    </div>
  );
}

export default App;
