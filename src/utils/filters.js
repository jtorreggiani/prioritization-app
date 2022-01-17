import * as dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { PRIORITY_MAP } from '../constants/priorities';
import { calculateDueDate, daysBetween } from './dates';

dayjs.extend(isBetween);

export function calculateUrgency (difference) {
  if (difference === 0) {
    return 'critical'
  } else if (difference === 1) {
    return 'high'
  } else if (difference === 2) {
    return 'medium'
  } else {
    return 'low'
  }
}

export function calculateUrgencyForTask (task) {
  if (task.dueDate) {
    const difference = daysBetween(dayjs(), dayjs(task.dueDate));
    return calculateUrgency(difference);
  } else if (task.urgency) {
    return task.urgency;
  } else {
    return 'low';
  }
}

export function sortCompare (a, b) {
  const aUrgency = calculateUrgencyForTask(a);
  const aImportance = PRIORITY_MAP[a.importance];
  const aPriority = aUrgency + aImportance;

  const bUrgency = calculateUrgencyForTask(b);
  const bImportance = PRIORITY_MAP[b.importance];
  const bPriority = bUrgency + bImportance;

  if (aPriority > bPriority) {
    return 1;
  }

  if (aPriority < bPriority) {
    return -1;
  }

  return 0;
}

export function searchFilter (task, filters) {
  if (filters.query === '' || !filters.query) return true

  const query = filters.query.toLowerCase()
  const title = task.title.toLowerCase()
  const tags = task.tags ? task.tags.toLowerCase() : ''

  return title.match(new RegExp(query)) || tags.match(new RegExp(query))
}

export function dateFilter (task, filters) {
  const dueDate = calculateDueDate(task);
  const today = dayjs();
  const nextWeek =  dayjs().add(7, 'day');
  const nextMonth = dayjs().add(30, 'day');

  if (filters.dateRange === 'today') {
    return dayjs(dueDate).isSame(today, 'day')
  } else if (filters.dateRange === 'week') {
    return dayjs(dueDate).isBetween(today, nextWeek, 'day')
  } else if (filters.dateRange === 'month') {
    return dayjs(dueDate).isBetween(today, nextMonth, 'day')
  } else if (filters.dateRange === 'overdue') {
    return dayjs(dueDate).isBefore(today, 'day')
  } else {
    return true
  }
}

export function statusFilter (task, filters) {
  const taskTask = task.status || 'planned';
  const filterStatus = filters.status;

  if (filterStatus === '') return true
  if (filterStatus === 'planned') return taskTask === 'planned'
  if (filterStatus === 'in-progress') return taskTask === 'in-progress'
  if (filterStatus === 'completed') return taskTask === 'completed'
  if (filterStatus === 'delegated') return taskTask === 'delegated'
  if (filterStatus === 'incomplete') return taskTask !== 'completed'
}

export function filterTasks (tasksDB, filters) {
  return Object.keys(tasksDB)
               .map(key => { return { id: key, ...tasksDB[key] } })
               .filter(task => dateFilter(task, filters))
               .filter(task => searchFilter(task, filters))
               .filter(task => statusFilter(task, filters))
               .sort(sortCompare)
}