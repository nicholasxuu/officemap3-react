import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Map from './containers/Map';
import configureStore from './stores/mapStore';
import './index.css';

let store = configureStore();
ReactDOM.render(
	<Provider store={store}>
		<Map />
	</Provider>,
	document.getElementById('root')
);
