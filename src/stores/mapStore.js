import { createStore, applyMiddleware } from 'redux';
import MapReducer from '../reducers/index';
import { loadFromApi } from '../actions/dataSync';
import Immutable from 'immutable';

const localStorageKey = 'officemapState';

export default function configureStore(middlewares) {
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
			...middlewares
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


	return store;
};

