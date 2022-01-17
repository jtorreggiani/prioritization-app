import React, { useState, useEffect } from 'react';
import { loadProjectString } from '../utils/local-storage';

export function useProjects () {
  const [projectString, setProjectString] = useState(loadProjectString());
  const [projects, setProjects] = useState(projectString.split(' '));

  function saveProjects () {
    setProjects(projectString.split(' '));
  }

  return {
    projectString,
    projects,
    setProjectString,
    setProjects,
    saveProjects,
  }
}
