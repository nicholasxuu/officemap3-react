import { createStore, applyMiddleware } from 'redux';
import MapReducer from '../reducers/index';
import { loadFromApi } from '../actions/dataSync';
import Immutable from 'immutable';



export default function configureStore(middlewares) {
	// load from localstorage first
	const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
	let preloadState = {};
	for (let stateKey in persistedState) {
		if (!['widgetData', 'hoverData', 'searchText', 'sidebar'].includes(stateKey)) {
			preloadState[stateKey] = Immutable.fromJS(persistedState[stateKey]);
		}
	}

	const store = createStore(
		MapReducer,
		preloadState,
		applyMiddleware(
			...middlewares
		)
	);

	let lastLocalStorageSaveTime = 0;
	store.subscribe(() => {
		// throttle local storage save action to at least 10 seconds
		let now = Date.now();
		if (now - lastLocalStorageSaveTime > 5000) {
			localStorage.setItem('reduxState', JSON.stringify(store.getState()));
			lastLocalStorageSaveTime = now;
		}
	});

	store.dispatch(loadFromApi());

	return store;
};

