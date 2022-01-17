export const PRIORITY_LEVEL = Object.freeze({
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
});

export const PRIORITY_MAP = Object.freeze({
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
});

export const PRIORITY_FILTER = Object.freeze({
  HIGHEST_PRIORITY: 'highest-priority',
  MOST_URGENT: 'most-urgent',
  MOST_IMPORTANCE: 'most-important',
  DUE_DATE: 'due-date',
  LEAST_URGENT: 'least-urgent',
  LEAST_IMPORTANT: 'least-importance',
  LOWEST_PRIORITY: 'lowest-priority',
});
