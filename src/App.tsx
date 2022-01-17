import React from 'react';
import TaskFilters from './components/TaskFilters';
import TaskTable from './components/TaskTable';
import { useFilters } from './hooks/filters';
import { useTasks } from './hooks/tasks';
import { useProjects } from './hooks/projects';
import { ProjectsContext } from './contexts/projects';

import './App.css';

function App() {
  const tasks = useTasks();
  const filters = useFilters();
  const projects = useProjects();

  return (
    <div className="App">
      <ProjectsContext.Provider value={projects}>
        <TaskFilters filters={filters} createTask={tasks.createTask} />
        <TaskTable tasks={tasks.where(filters)} />
      </ProjectsContext.Provider>
    </div>
  );
}

export default App;
