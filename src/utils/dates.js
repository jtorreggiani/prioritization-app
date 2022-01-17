import { PRIORITY_MAP } from '../constants/priorities';
import { calculateUrgency } from '../utils/filters';

export function zeroPaddedMonth(date) {
  const month = date.getMonth() + 1;
  return (month < 10 ? '0' : '') + month;
}

export function zeroPaddedDate(date) {
  const day = date.getDate();
  return (day < 10 ? '0' : '') + day;
}

export function daysBetween(date1, date2) {
  const diff = date2.diff(date1, 'day')

  if (diff <= 0) return 0;

  return diff
}
