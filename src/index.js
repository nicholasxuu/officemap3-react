/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import Map from './components/main/MapContainer';
import configureStore from './store';
import BrowserRouter, { history } from './components/main/BrowserRouter';

const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path="/" component={Map} />
      <Route path="/mmm" component={Map} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
