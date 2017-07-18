import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import Map from './components/MapContainer';
import configureStore from './stores/mapStore';

// middlewares
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

const loggerMiddleware = createLogger();
const history = createHistory();
const historyMiddleware = routerMiddleware(history);


const middlewares = [
	thunkMiddleware,
	historyMiddleware,
	loggerMiddleware,
];

const store = configureStore(middlewares);

ReactDOM.render(
	<Provider store={store}>
		<Map />
	</Provider>,
	document.getElementById('root')
);
