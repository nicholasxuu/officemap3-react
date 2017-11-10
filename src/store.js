/* eslint-env browser */
import { createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import MapReducer from './reducers/index';
import { loadFromApi } from './actions/api';

const loggerMiddleware = createLogger();

// local storage key constant
const localStorageKey = 'officemapState';

export default function configureStore(history) {
  const reactRouterMiddleware = routerMiddleware(history);

  /**
   * Try read from local storage for preloaded state
   */
  const persistedState = localStorage.getItem(localStorageKey) ?
    JSON.parse(localStorage.getItem(localStorageKey)) : {};

  // Convert to legal format, each item in list should be an immutable object
  const noPersistedStateKeys = [
    'widgetData',
    'hoverData',
    'searchText',
    'sidebar',
  ];
  const preloadState = Object.keys(persistedState).reduce((currState, stateKey) => {
    const nextState = currState;
    if (!noPersistedStateKeys.includes(stateKey)) {
      nextState[stateKey] = Immutable.fromJS(persistedState[stateKey]);
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
    ),
  );

  /**
   * Save to localstorage once every 5 seconds
   */
  let lastLocalStorageSaveTime = 0;
  store.subscribe(() => {
    // throttle local storage save action to at least 10 seconds
    const now = Date.now();
    if (now - lastLocalStorageSaveTime > 5000) {
      localStorage.setItem(localStorageKey, JSON.stringify(store.getState()));
      lastLocalStorageSaveTime = now;
    }
  });

  /**
   * Fetch API for latest data.
   */
  store.dispatch(loadFromApi());

  return store;
}

