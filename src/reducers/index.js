import { combineReducers } from 'redux';
import mapLocationDataReducer from './mapLocationData';
import searchLocationReducer from './searchLocation';
import mapHoverDataReducer from './mapHoverData';
import mapWidgetDataReducer from './mapWidgetData';
import svgImageReducer from './svgImage';
import mapViewReducer from './mapView';
import settingsReducer from './settings';

const MapReducer = combineReducers({
	locations: mapLocationDataReducer,
	imageDataCollection: svgImageReducer,
	mapView: mapViewReducer,
	widgetData: mapWidgetDataReducer,
	hoverData: mapHoverDataReducer,
	searchText: searchLocationReducer,
	settings: settingsReducer,
});

export default MapReducer;