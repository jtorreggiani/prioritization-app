import React from 'react';
import { loadProjects } from '../utils/local-storage';

function ProjectSelect ({ project, onChange }) {
  const projects = loadProjects();

  return (
    <select value={project} onChange={onChange}>
      <option value="none">None</option>
      {projects.map(project => {
        return <option key={project} value={project}>{project}</option>
      })}
    </select>
  )
}

export default ProjectSelect;
