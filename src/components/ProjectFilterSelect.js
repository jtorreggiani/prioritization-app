import React, { useState, useContext } from 'react';
import { ProjectsContext } from '../contexts/projects';
import { useProjects } from '../hooks/projects';

function ProjectFilterSelect ({
  project,
  onChange,
  onSave,
  defaultOption = { value: '', label: 'Any' }
}) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    projects,
    projectString,
    setProjectString,
    saveProjects
  } = useContext(ProjectsContext);

  function toggleEditing () {
    if (isEditing) {
      saveProjects();
    }

    setIsEditing(!isEditing)

  }

  function onStringChange (e: React.FormEvent<HTMLInputElement>) {
    const value = e.target.value;
    localStorage.setItem('PROJECT_FILTERS', value);
    setProjectString(value);
  }

  if (isEditing) {
    return (
      <>
        <label>
          Project
          <button className="edit-button" onClick={toggleEditing}>✔️</button>
        </label>

        <input
          type="text"
          value={projectString}
          onChange={onStringChange}
          className="project-input"
        />
      </>
    )
  } else {
    return (
      <>
        <label>
          Project
          <button className="edit-button" onClick={toggleEditing}>✎</button>
        </label>

        <select key={project} value={project} onChange={onChange} className="filter-select">
          <option value={defaultOption.value}>{defaultOption.label}</option>
          {projects.map(project => {
            return <option key={project} value={project}>{project}</option>
          })}
        </select>
      </>
    )
  }
}

export default ProjectFilterSelect
