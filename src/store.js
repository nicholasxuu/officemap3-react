/* eslint-env browser */
import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import MapReducer from './reducers/index';
import { loadFromApi } from './actions/api';
import { NO_PERSISTED_STATE_KEYS } from './constants/Keys';

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

  const preloadState = Object.keys(persistedState).reduce((currState, stateKey) => {
    const nextState = currState;
    if (!NO_PERSISTED_STATE_KEYS.includes(stateKey)) {
      nextState[stateKey] = Immutable.fromJS(persistedState[stateKey]);
    }
    return currState;
  }, {});

  // redux-devtools
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

  /* eslint-disable function-paren-newline */
  const enhancer = composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      reactRouterMiddleware,
      // loggerMiddleware,
    ),
  );
  /* eslint-enable */

  /**
   * Create store
   */
  const store = createStore(
    MapReducer,
    preloadState,
    enhancer,
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

