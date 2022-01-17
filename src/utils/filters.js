import * as dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { daysBetween } from './dates';
import { PRIORITY_MAP, PRIORITY_LEVEL } from '../constants/priorities';
import { STATUSES } from '../constants/statuses';

dayjs.extend(isBetween);

export function calculateUrgency (difference) {
  if (difference === 0) {
    return PRIORITY_LEVEL.CRITICAL;
  } else if (difference === 1) {
    return PRIORITY_LEVEL.HIGH;
  } else if (difference === 2) {
    return PRIORITY_LEVEL.MEDIUM;
  } else {
    return PRIORITY_LEVEL.LOW;
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

export function prioritySort (a, b, filters) {
  const urgencyA = PRIORITY_MAP[a.urgency];
  const urgencyB = PRIORITY_MAP[b.urgency];
  const importanceA = PRIORITY_MAP[a.importance];
  const importanceB = PRIORITY_MAP[b.importance];

  let priorityA
  let priorityB

  if (filters.priority === 'highest-priority') {
    priorityA = urgencyA + importanceA;
    priorityB = urgencyB + importanceB;
  }

  if (filters.priority === 'most-urgent') {
    priorityA = urgencyA;
    priorityB = urgencyB;
  }

  if (filters.priority === 'most-important') {
    priorityA = importanceA;
    priorityB = importanceB;
  }

  if (filters.priority === 'least-important') {
    priorityA = importanceB;
    priorityB = importanceA;
  }

  if (filters.priority === 'least-urgent') {
    priorityA = urgencyB;
    priorityB = urgencyA;
  }

  if (filters.priority === 'lowest-priority') {
    priorityA = urgencyB + importanceB;
    priorityB = urgencyA + importanceA;
  }

  if (filters.priority === 'due-date') {
    if (!a.dueDate || !b.dueDate) return 0;

    const dueDateA = dayjs(a.dueDate);
    const dueDateB = dayjs(b.dueDate);

    if (dueDateA.isAfter(dueDateB)) {
      return 1
    } else if (dueDateA.isBefore(dueDateB)) {
      return -1
    }
  }

  if (priorityA > priorityB) {
    return 1;
  }

  if (priorityA < priorityB) {
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

export function projectFilter (task, filters) {
  if (filters.project === '' || !filters.project) return true

  return filters.project === task.project;
}

export function durationFilter (task, filters) {
  if (filters.duration === '' || !filters.duration) return true

  return filters.duration === task.duration;
}

export function dateFilter (task, filters) {
  const dueDate = dayjs(task.dueDate);
  const today = dayjs();
  const nextWeek =  dayjs().add(7, 'day');
  const nextMonth = dayjs().add(30, 'day');

  if (filters.dateRange === 'today') {
    return dayjs(dueDate).isSame(today, 'day')
  } else if (filters.dateRange === 'week') {
    return dayjs(dueDate).isBetween(today, nextWeek, 'day', '[]')
  } else if (filters.dateRange === 'month') {
    return dayjs(dueDate).isBetween(today, nextMonth, 'day', '[]')
  } else if (filters.dateRange === 'overdue') {
    return dayjs(dueDate).isBefore(today, 'day')
  } else {
    return true
  }
}

export function statusFilter (task, filters) {
  const taskTask = task.status || 'planned';

  switch (filters.status) {
    case STATUSES.INCOMPLETE:
      return taskTask !== STATUSES.COMPLETED;
    case STATUSES.PLANNED:
      return taskTask === STATUSES.PLANNED;
    case STATUSES.IN_PROGRESS:
      return taskTask === STATUSES.IN_PROGRESS;
    case STATUSES.BLOCKED:
        return taskTask === STATUSES.BLOCKED;
    case STATUSES.COMPLETED:
      return taskTask === STATUSES.COMPLETED;
    case STATUSES.DELEGATED:
      return taskTask === STATUSES.DELEGATED;
    default:
      console.log(`No filter ${filters.status}.`);
  }
}

export function filterTasks (tasksDB, filters) {
  return Object.keys(tasksDB)
               .map(key => { return { id: key, ...tasksDB[key] } })
               .filter(task => dateFilter(task, filters))
               .filter(task => searchFilter(task, filters))
               .filter(task => statusFilter(task, filters))
               .filter(task => projectFilter(task, filters))
               .filter(task => durationFilter(task, filters))
               .sort((a, b) => prioritySort(a, b, filters))
}
