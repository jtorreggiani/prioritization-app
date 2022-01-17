export const TASK_DATA_KEY = 'TASK_DATA';

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
