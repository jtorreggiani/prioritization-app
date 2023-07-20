import { useContext } from 'react';
import { FiltersContext } from '../contexts/filters';

function TaskStats () {
  const { taskStore, filterStore: { filters } } = useContext(FiltersContext);

  const filteredTasks = taskStore.where(filters).filter(task => {
    if (task.duration === '') return false;
    return task;
  }).map(task => {
    return parseInt(task.duration) / 60;
  });
  
  const totalDuration = filteredTasks.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return (
    <>
      <p className="stats">Total duration: {totalDuration.toFixed(2)} hours</p>
    </>
  )
}

export default TaskStats;