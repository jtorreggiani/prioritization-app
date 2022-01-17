import React, { useState, useContext } from 'react';
import { FiltersContext } from '../contexts/filters';
import ProjectSelect from './ProjectSelect';

export function ProjectInput ({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="project-input"
    />
  )
}

function ProjectFilterLabel ({ isEditing, onClick }) {
  return (
    <label>
      <span>Project</span>
      <button className="edit-button" onClick={onClick}>
        { isEditing ? '✔️' : '✎' }
      </button>
    </label>
  )
}

function ProjectFilterSelect ({ value, onChange }) {
  const { projectStore } = useContext(FiltersContext);
  const [isEditing, setIsEditing] = useState(false);

  function toggleEditing () {
    if (isEditing) {
      projectStore.save();
    };

    setIsEditing(!isEditing);
  }

  if (isEditing) {
    return (
      <>
        <ProjectFilterLabel isEditing={isEditing} onClick={toggleEditing} />
        <ProjectInput
          onChange={(e) => projectStore.set(e.target.value)}
          toggleEditing={toggleEditing}
          value={projectStore.dataString}
        />
      </>
    )
  }

  return (
    <>
      <ProjectFilterLabel isEditing={isEditing} onClick={toggleEditing} />
      <ProjectSelect
        defaultLabel="Any"
        onChange={onChange}
        options={projectStore.data}
        value={value}
      />
    </>
  )
}

export default ProjectFilterSelect
