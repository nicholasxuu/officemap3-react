import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import MapReducer from '../reducers/index';
import { loadDummy } from '../actions/dataSync';

export default function configureStore(preloadedState) {
	const store = createStore(
		MapReducer,
		preloadedState,
		applyMiddleware(
			thunkMiddleware,
		)
	);

	store.dispatch(loadDummy());

	return store;
};

