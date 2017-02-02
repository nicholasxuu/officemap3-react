import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import OfficeMapReducer from '../reducers/index';

export default function configureStore(preloadedState) {
	const store = createStore(
		OfficeMapReducer,
		preloadedState,
		applyMiddleware(
			thunkMiddleware,
		)
	);

	return store;
};

