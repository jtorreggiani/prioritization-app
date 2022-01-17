export const TASK_DATA_KEY = 'TASK_DATA';
export const PROJECT_FILTERS_KEY = 'PROJECT_FILTERS';

export function loadLocalStorageData () {
  const existingData = localStorage.getItem(TASK_DATA_KEY);

  if (existingData) {
    return JSON.parse(existingData);
  } else {
    localStorage.setItem(TASK_DATA_KEY, '{}');
    return {};
  }
}

export function saveToLocalStorage (data) {
  localStorage.setItem(TASK_DATA_KEY, JSON.stringify(data));
}

export function loadProjectString () {
  const existingData = localStorage.getItem(PROJECT_FILTERS_KEY);

  if (existingData && existingData !== '') {
    return existingData;
  } else {
    localStorage.setItem(PROJECT_FILTERS_KEY, 'work side-project recreation');
    return {};
  }
}

export function loadProjects () {
  return loadProjectString().split(' ');
}
