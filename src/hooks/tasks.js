import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { filterTasks } from '../utils/filters';
import { getTaskData, saveTaskData } from '../utils/local-storage';

export function useTaskStore () {
  const [data, setTaskData] = useState(getTaskData());

  function saveTaskIndex (updatedData) {
    saveTaskData({ ...updatedData });
    // NOTE: Using spread operator to trigger state change.
    setTaskData({ ...updatedData });
  }

  function createTask () {
    const id = uuidv4();
    data[id] = {
      id,
      title: '',
      urgency: 'low',
      importance: 'low',
    };

    saveTaskIndex({ ...data });
  }

  function setTask (id, key, value) {
    data[id][key] = value;
    saveTaskIndex({ ...data });
  }

  function removeTask (id) {
    delete data[id];
    saveTaskIndex({ ...data });
  }

  function duplicateTask (existingId) {
    const id = uuidv4();
    const existingTask = data[existingId];
    data[id] = { ...existingTask, id };
    saveTaskIndex({ ...data });
  }

  function decorateTask (task) {
    const { id } = task;

    return {
      ...task,
      set: (key, value) => setTask(id, key, value),
      remove: () => removeTask(id),
      duplicate: () => duplicateTask(id),
    }
  }

  return {
    data,
    createTask,
    duplicateTask,
    removeTask,
    setTask,
    where: (filters = {}) => {
      return filterTasks(data, filters).map(decorateTask);
    },
  }
}
