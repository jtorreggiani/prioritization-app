import React from 'react';

function ProjectSelect ({ project, onChange }) {
  const projects = localStorage.getItem('PROJECT_FILTERS').split(' ');

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
