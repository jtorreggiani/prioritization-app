import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { filterTasks } from '../utils/filters';
import { getTaskData, saveTaskData } from '../utils/local-storage';
import * as dayjs from 'dayjs';

const today = dayjs();
const nextWeek =  dayjs().add(7, 'day');
const nextMonth = dayjs().add(30, 'day');

export function dateForFilter (timeframe) {
  if (!timeframe || timeframe === '') return '';

  if (timeframe === 'today') {
    return today.format('YYYY-MM-DD');
  } else if (timeframe === 'tomorrow') {
    return today.add(1, 'day').format('YYYY-MM-DD');
  } else if (timeframe === 'week') {
    return nextWeek.format('YYYY-MM-DD');
  } else if (timeframe === 'month') {
    return nextMonth.format('YYYY-MM-DD');
  } else if (timeframe === 'overdue') {
    return today.subtract(1, 'day').format('YYYY-MM-DD');
  } else {
    return today.format('YYYY-MM-DD');
  }
}

export function useTaskStore () {
  const [data, setTaskData] = useState(getTaskData());

  function saveTaskIndex (updatedData) {
    saveTaskData({ ...updatedData });
    setTaskData({ ...updatedData });
  }

  function createTask (options = { project: '', timeframe: '' }) {
    const dueDate = dateForFilter(options.timeframe)
    console.log('new', options.timeframe);
    const id = uuidv4();
    data[id] = {
      id,
      title: '',
      urgency: 'low',
      importance: 'low',
      duration: '5',
      project: options.project,
      dueDate: dueDate,
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
