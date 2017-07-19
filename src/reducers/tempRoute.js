// import Immutable from 'immutable';
import { FILTER_LOCATION } from '../actions/sidebar';
import { MAP_SHOW_WIDGET, MAP_HIDE_WIDGET } from "../actions/map";

import Immutable from 'immutable';

const setQuery = (queryParameter, queryValue) => {
	let newLocation = window.location.origin + window.location.pathname + '?' + queryParameter + '=' + queryValue;
	window.history.replaceState('', '', newLocation);
};

const unsetQuery = (queryParameter) => {
	let cleanLocation = window.location.origin + window.location.pathname;
	window.history.replaceState('', '', cleanLocation);
};

const tempRoute = (state = {}, action) => {
	switch (action.type) {
		case FILTER_LOCATION:
			if (action.searchText === '') {
				unsetQuery('search');
			} else {
				setQuery('search', action.searchText);
			}
			break;
		case MAP_SHOW_WIDGET:
			setQuery('location', action.locationObj.get('mapElementId'));
			break;
		case MAP_HIDE_WIDGET:
			unsetQuery('location');
			break;
		default:
	}
	return state;
};

export default tempRoute;