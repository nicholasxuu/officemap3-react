import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import MapReducer from '../reducers/index';
import { loadDummy, loadFromApi } from '../actions/dataSync';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
	const store = createStore(
		MapReducer,
		preloadedState,
		applyMiddleware(
			thunkMiddleware,
			// loggerMiddleware,
		)
	);

	store.dispatch(loadDummy()); // load dummy first
	store.dispatch(loadFromApi());

	return store;
};

