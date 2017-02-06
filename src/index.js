import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
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
