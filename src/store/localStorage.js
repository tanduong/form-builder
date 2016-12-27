import throttle from 'lodash/throttle';
const VERSION = '0.1.2';

export const loadState = () => {
  try {
    const localVersion = localStorage.getItem('version');

    if(VERSION !== localVersion) {
      localStorage.clear();
      return undefined;
    }

    const serializedState = localStorage.getItem('state');

    if(serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch(error) {
    console.error(error);
    return undefined;
  }
};

export const saveState = throttle((state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    localStorage.setItem('version', VERSION);
  } catch(error) {
    console.error(error);
  }
}, 1000);
