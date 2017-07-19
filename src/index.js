import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import Map from './components/main/MapContainer';
import configureStore from './stores/mapStore';

// middlewares
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

// logger middleware for debugging.
const loggerMiddleware = createLogger();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);


const middlewares = [
	thunkMiddleware,
	historyMiddleware,
	// loggerMiddleware,
];

const store = configureStore(middlewares);

ReactDOM.render(
	<Provider store={store}>
		<Map />
	</Provider>,
	document.getElementById('root')
);
