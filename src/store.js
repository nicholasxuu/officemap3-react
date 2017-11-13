/* eslint-env browser */
import { createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import MapReducer from './reducers/index';
import { loadFromApi } from './actions/api';
import LocalStorageUtils from './utils/LocalStorageUtils';
import { LOCAL_STORAGE_KEY_PREFIX, NO_PERSISTED_STATE_KEYS } from './constants/StateManager';
import LocalStorageMiddleware from './middlewares/LocalStorageMiddleware';

// eslint-disable-next-line no-unused-vars
const loggerMiddleware = createLogger();

export default function configureStore(history) {
  const reactRouterMiddleware = routerMiddleware(history);

  /**
   * Try read from local storage for preloaded state
   */
  const localStorageKeys = LocalStorageUtils.list(LOCAL_STORAGE_KEY_PREFIX);
  const preloadState = localStorageKeys.reduce((currState, localStorageKey) => {
    const stateKey = localStorageKey.substr(LOCAL_STORAGE_KEY_PREFIX.length);
    if (!NO_PERSISTED_STATE_KEYS.includes(stateKey)) {
      const stateVal = LocalStorageUtils.get(localStorageKey);
      if (stateVal) {
        const nextState = currState;
        nextState[stateKey] = Immutable.fromJS(JSON.parse(stateVal));
        return nextState;
      }
    }
    return currState;
  }, {});

  /**
   * Create store
   */
  const store = createStore(
    MapReducer,
    preloadState,
    applyMiddleware(
      thunkMiddleware,
      // loggerMiddleware,
      reactRouterMiddleware,
      // LocalStorageMiddleware,
    ),
  );

  /**
   * Fetch API for latest data.
   */
  store.dispatch(loadFromApi());

  return store;
}

