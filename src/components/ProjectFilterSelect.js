import React, { useState } from 'react';
import { loadProjectString } from '../utils/local-storage';

function ProjectFilterSelect ({
  project,
  onSelectProjectFilter,
  defaultOption = { value: '', label: 'Any' }
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState(loadProjectString());

  function toggleEditing () {
    setIsEditing(!isEditing)
  }

  function onChange (e: React.FormEvent<HTMLInputElement>) {
    const value = e.target.value;
    localStorage.setItem('PROJECT_FILTERS', value);
    setProjects(value);
  }

  const options = projects.split(' ');

  if (isEditing) {
    return (
      <>
        <label>
          Project
          <button className="edit-button" onClick={toggleEditing}>✔️</button>
        </label>
        <input type="text" value={projects} onChange={onChange} className="projects-input" />
      </>
    )
  } else {
    return (
      <>
        <label>
          Project
          <button className="edit-button" onClick={toggleEditing}>✎</button>
        </label>

        <select key={project} value={project} onChange={onSelectProjectFilter}>
          <option value={defaultOption.value}>{defaultOption.label}</option>
          {options.map(project => {
            return <option key={project} value={project}>{project}</option>
          })}
        </select>
      </>
    )
  }
}

export default ProjectFilterSelect
