import { PRIORITY_MAP } from '../constants/priorities';

export function zeroPaddedMonth(date) {
  const month = date.getMonth() + 1;
  return (month < 10 ? '0' : '') + month;
}

export function zeroPaddedDate(date) {
  const day = date.getDate();
  return (day < 10 ? '0' : '') + day;
}

export function calculateDueDate (task) {
  if (task.dueDate) return task.dueDate

  const date = new Date();
  const priority = PRIORITY_MAP[task.urgency]

  // TODO: Replace with dayjs syntax
  date.setDate(date.getDate() + priority)
  const dateString = `${date.getFullYear()}-${zeroPaddedMonth(date)}-${zeroPaddedDate(date)}`;

  return dateString;
}

export function daysBetween(date1, date2) {
  const diff = date2.diff(date1, 'day')

  if (diff <= 0) return 0;

  return diff
}
