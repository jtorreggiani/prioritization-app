import React, { useContext } from 'react';
import { useProjects } from '../hooks/projects';
import { ProjectsContext } from '../contexts/projects';

function ProjectSelect ({ project, onChange }) {
  const { projects } = useContext(ProjectsContext);

  return (
    <select value={project} onChange={onChange} className="task-select">
      <option value="none">None</option>
      {projects.map(project => {
        return <option key={project} value={project}>{project}</option>
      })}
    </select>
  )
}

export default ProjectSelect;
