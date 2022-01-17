import React, { useContext } from 'react';
import { FiltersContext } from '../contexts/filters';

function ProjectSelect ({ value, onChange, defaultLabel = 'None' }) {
  const { projectStore } = useContext(FiltersContext);

  return (
    <select className="task-select" value={value} onChange={onChange}>
      <option value="">{ defaultLabel }</option>
      {projectStore.data.map(project => {
        return <option key={project} value={project}>{project}</option>
      })}
    </select>
  )
}

export default ProjectSelect;
