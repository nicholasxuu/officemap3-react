import { createStore, applyMiddleware } from 'redux';
import MapReducer from '../reducers/index';
import { loadFromApi } from '../actions/dataSync';
import Immutable from 'immutable';


export default function configureStore(middlewares) {
	const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

	let preloadState = {};

	for (let stateKey in persistedState) {
		preloadState[stateKey] = Immutable.fromJS(persistedState[stateKey]);
	}

	const store = createStore(
		MapReducer,
		preloadState,
		applyMiddleware(
			...middlewares
		)
	);

	store.subscribe(() => {
		localStorage.setItem('reduxState', JSON.stringify(store.getState()))
	});

	store.dispatch(loadFromApi());

	return store;
};

