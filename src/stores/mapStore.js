import { createStore, applyMiddleware } from 'redux';
import MapReducer from '../reducers/index';
import { loadFromApi } from '../actions/dataSync';
import { goToLocation } from "../actions/map";
import { filterLocation } from "../actions/sidebar";
import Immutable from 'immutable';

// thunk middleware for api fetching
import thunkMiddleware from 'redux-thunk';
// logger middleware for debugging.
import createLogger from 'redux-logger';
const loggerMiddleware = createLogger();

// local storage key constant
const localStorageKey = 'officemapState';

export default function configureStore() {
	/**
	 * Try read from local storage for preloaded state
	 */
	const persistedState = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)) : {};

	// Convert to legal format, each item in list should be an immutable object
	let preloadState = {};
	const noPersistedStateKeys = [
		'widgetData',
		'hoverData',
		'searchText',
		'sidebar',
	];
	for (let stateKey in persistedState) {
		if (!noPersistedStateKeys.includes(stateKey)) {
			preloadState[stateKey] = Immutable.fromJS(persistedState[stateKey]);
		}
	}

	/**
	 * Create store
	 */
	const store = createStore(
		MapReducer,
		preloadState,
		applyMiddleware(
			thunkMiddleware,
			// loggerMiddleware,
		)
	);

	/**
	 * Save to localstorage once every 5 seconds
	 */
	let lastLocalStorageSaveTime = 0;
	store.subscribe(() => {
		// throttle local storage save action to at least 10 seconds
		let now = Date.now();
		if (now - lastLocalStorageSaveTime > 5000) {
			localStorage.setItem(localStorageKey, JSON.stringify(store.getState()));
			lastLocalStorageSaveTime = now;
		}
	});

	/**
	 * Fetch API for latest data.
	 */
	store.dispatch(loadFromApi());

	/**
	 * Doing this before react-router-redux v5 is available.
	 * We need react-router-redux for action based routing.
	 * But current version of react-router-redux doesn't work with react-router v4 yet.
	 * Using react-router v3 will require a big refactor to "upgrade" to react-router v4.
	 */
	let queryStr = window.location.search;
	let query = {};
	let a = (queryStr[0] === '?' ? queryStr.substr(1) : queryStr).split('&');
	for (let i = 0; i < a.length; i++) {
		let b = a[i].split('=');
		query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
	}

	if (query['location']) {
		store.dispatch(goToLocation(query['location'], true));
	} else if (query['search']) {
		store.dispatch(filterLocation(query['search']));
	}

	return store;
};

