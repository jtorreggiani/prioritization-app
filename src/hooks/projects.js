import { useState } from 'react';
import { getProjectData, saveProjectData } from '../utils/local-storage';

export function useProjectStore () {
  const [dataString, setDataString] = useState(getProjectData());
  const [data, setData] = useState(dataString.split(' '));

  return {
    data,
    dataString,
    set: setDataString,
    save: () => {
      saveProjectData(dataString);
      setData(dataString.split(' '));
    },
  }
}
