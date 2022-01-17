export const TASK_DATA_KEY = 'TASK_DATA';
export const PROJECT_FILTERS_KEY = 'PROJECT_FILTERS';
export const TASK_FILTERS_KEY = 'TASK_FILTERS';
export const DEFAULT_PROJECTS = 'Work Side-Project Recreation';

export const DEFAULT_FILTERS = Object.freeze({
  timeframe: '',
  priority: 'highest-priority',
  project: '',
  query: '',
  status: 'incomplete',
});

export function getLocalStorageData (key, defaultData) {
  const existingData = localStorage.getItem(key);

  if (existingData) {
    return JSON.parse(existingData);
  } else {
    saveToLocalStorage(key, defaultData);
    return defaultData;
  }
}

export function saveToLocalStorage (key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getTaskData () {
  return getLocalStorageData(TASK_DATA_KEY, {});
}

export function getProjectData () {
  return getLocalStorageData(PROJECT_FILTERS_KEY, DEFAULT_PROJECTS);
}

export function getFilterData () {
  return getLocalStorageData(TASK_FILTERS_KEY, DEFAULT_FILTERS);
}

export function getProjects () {
  return getProjectData().split(' ');
}

export function saveFilterData (data) {
  saveToLocalStorage(TASK_FILTERS_KEY, data);
}

export function saveTaskData (data) {
  saveToLocalStorage(TASK_DATA_KEY, data);
}

export function saveProjectData (data) {
  saveToLocalStorage(PROJECT_FILTERS_KEY, data);
}
