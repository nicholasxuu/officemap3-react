import React from 'react';
import ReactDOM from 'react-dom';
import Map from './containers/Map';
import configureStore from './stores/mapStore';
import './index.css';

let store = configureStore();
ReactDOM.render(
  <Map />,
  document.getElementById('root')
);
