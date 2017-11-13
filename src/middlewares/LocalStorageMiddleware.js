import LocalStorageUtils from '../utils/LocalStorageUtils';
import { LOCAL_STORAGE_KEY_PREFIX, NO_PERSISTED_STATE_KEYS } from '../constants/StateManager';

let lastSyncTime = 0;

const LocalStorageMiddleware = store => next => (action) => {
  const currTime = Date.now();
  if (currTime - lastSyncTime < 5000) {
    return next(action);
  }

  lastSyncTime = currTime;

  const prevState = store.getState();
  const result = next(action);
  const nextState = store.getState();

  Object.keys(prevState).forEach((stateKey) => {
    if (!NO_PERSISTED_STATE_KEYS.includes(stateKey)) {
      if (prevState[stateKey] !== nextState[stateKey]) {
        LocalStorageUtils.set(
          `${LOCAL_STORAGE_KEY_PREFIX}${stateKey}`,
          JSON.stringify(nextState[stateKey]),
        );
      }
    }
  });

  return result;
};

export default LocalStorageMiddleware;
