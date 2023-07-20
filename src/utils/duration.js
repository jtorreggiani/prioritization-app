import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const PAUSED_STATES = new Set([
  'paused',
  'blocked',
  'delegated'
]);

const RESTARTABLE_STATUS = new Set([
  'paused',
  'delegated',
  'blocked',
]);

export function calculateActualDuration (task, newStatus) {
  const now = new Date().toISOString();

  const startable = !task.status || task.status === '' || task.status === 'planned';
  if (startable && newStatus === 'in-progress') {
    task.set('startedAt', now);
  }

  if (task.status === 'in-progress' && newStatus === 'completed') {
    task.set('completedAt', now);
    task.set(
      'actualDuration',
      task.actualDuration + calculateDurationInSeconds(task.startedAt, now),
    );
  }

  if (task.status === 'completed' && newStatus === 'in-progress') {
    task.set('completedAt', null);
  }

  if (PAUSED_STATES.has(newStatus)) {
    task.set('actualDuration', calculateDurationInSeconds(task.startedAt, now));
  }

  if (RESTARTABLE_STATUS.has(task.status) && newStatus === 'in-progress') {
    task.set('restartedAt', now);
  }

  task.set('status', newStatus);
}

function calculateDurationInSeconds (startedAt, completedAt) {
  if (!startedAt || !completedAt) return null;

  const duration = dayjs(completedAt).diff(startedAt);
  return Math.round(duration / 1000);
}

export function actualDurationInSeconds(task) {
  if (!task.startedAt && !task.completedAt) {
    return null;
  }

  const paused = task.status === 'paused' || task.status === 'blocked';
  
  if (paused) return task.actualDuration;

  if (task.restartedAt && !task.completedAt) {
    return task.actualDuration + calculateDurationInSeconds(task.restartedAt, dayjs());
  }

  if (task.startedAt && !task.completedAt) {
    return calculateDurationInSeconds(task.startedAt, dayjs());
  }

  return task.actualDuration;
}

function formatDuration(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  seconds = seconds % 60;

  return (
    ("0" + hours).slice(-2) +
    ":" +
    ("0" + minutes).slice(-2) +
    ":" +
    ("0" + seconds).slice(-2)
  );
}

export function humanizeDuration(duration) {
  if (!duration) return '00:00:00';

  return formatDuration(duration);
}