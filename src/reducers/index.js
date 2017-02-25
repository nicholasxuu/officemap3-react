import { combineReducers } from 'redux';
import locationDataReducer from './locationData';
import searchLocationReducer from './searchLocation';
import mapHoverDataReducer from './mapHoverData';
import mapWidgetDataReducer from './mapWidgetData';
import svgImageReducer from './svgImage';
import mapViewReducer from './mapView';
import settingsReducer from './settings';

const MapReducer = combineReducers({
	locations: locationDataReducer,
	imageDataCollection: svgImageReducer,
	mapView: mapViewReducer,
	widgetData: mapWidgetDataReducer,
	hoverData: mapHoverDataReducer,
	searchText: searchLocationReducer,
	settings: settingsReducer,
});

export default MapReducer;