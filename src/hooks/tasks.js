import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { filterTasks } from '../utils/filters';
import { loadLocalStorageData, saveToLocalStorage } from '../utils/local-storage';

export function useTasks () {
  const [taskIndex, setTaskIndex] = useState(loadLocalStorageData());

  function saveTaskIndex (newTaxIndex) {
    saveToLocalStorage(taskIndex);
    setTaskIndex({ ...taskIndex });
  }

  function createTask () {
    const id = uuidv4();
    taskIndex[id] = {
      id,
      title: '',
      urgency: 'low',
      importance: 'low',
    };
    saveTaskIndex(taskIndex);
  }

  function setTask (id, key, value) {
    taskIndex[id][key] = value;
    saveTaskIndex(taskIndex);
  }

  function removeTask (id) {
    delete taskIndex[id];
    saveTaskIndex(taskIndex);
  }

  function duplicateTask (existingId) {
    const id = uuidv4();
    const existingTask = taskIndex[existingId];
    taskIndex[id] = { ...existingTask, id };
    saveTaskIndex(taskIndex);
  }

  function setTaskPriority (id, fieldName, value) {
    const dueDate = fieldName === 'urgency'
      ? null
      : taskIndex[id]['dueDate'];

    taskIndex[id]['dueDate'] = dueDate;
    taskIndex[id][fieldName] = value;
    saveTaskIndex(taskIndex);
  }

  function setDueDate (id, value) {
    taskIndex[id]['urgency'] = null;
    taskIndex[id]['dueDate'] = value;
    saveTaskIndex(taskIndex);
  }

  function decorateTask (task) {
    const { id } = task;

    return {
      ...task,
      set: (key, value) => setTask(id, key, value),
      setPriority: (key, value) => setTaskPriority(id, key, value),
      setDueDate: (value) => setDueDate(id, value),
      remove: () => removeTask(id),
      duplicate: () => duplicateTask(id),
    }
  }

  return {
    createTask,
    duplicateTask,
    removeTask,
    setDueDate,
    setTask,
    setTaskPriority,
    where: (filters = {}) => filterTasks(taskIndex, filters).map(decorateTask),
  }
}
