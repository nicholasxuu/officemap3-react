import { createStore, applyMiddleware } from 'redux';
import MapReducer from '../reducers/index';
import { loadFromApi } from '../actions/dataSync';


export default function configureStore(preloadedState, middlewares) {
	const store = createStore(
		MapReducer,
		preloadedState,
		applyMiddleware(
			...middlewares
		)
	);

	store.dispatch(loadFromApi());

	return store;
};

