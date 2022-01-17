export const TASK_DATA_KEY = 'TASK_DATA';
export const PROJECT_FILTERS_KEY = 'PROJECT_FILTERS';
export const TASK_FILTERS_KEY = 'TASK_FILTERS';

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

const DEFAULT_FILTERS = Object.freeze({
  query: '',
  status: 'incomplete',
  dateRange: '',
  priority: 'highest-priority',
  project: '',
});

export function loadFilters () {
  const existingData = localStorage.getItem(TASK_FILTERS_KEY);

  if (existingData && existingData !== '') {
    console.log(JSON.parse(existingData))
    return JSON.parse(existingData);
  } else {
    localStorage.setItem(TASK_FILTERS_KEY, JSON.stringify(DEFAULT_FILTERS));
    return DEFAULT_FILTERS;
  }
}

export function saveFiltersToLocalStorage (data) {
  localStorage.setItem(TASK_FILTERS_KEY, JSON.stringify(data));
}
