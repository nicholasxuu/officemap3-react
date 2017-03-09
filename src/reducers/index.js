import { combineReducers } from 'redux';
import locationDataReducer from './locationData';
import searchLocationReducer from './searchLocation';
import mapHoverDataReducer from './mapHoverData';
import mapWidgetDataReducer from './mapWidgetData';
import svgImageReducer from './svgImage';
import mapViewReducer from './mapView';
import settingsReducer from './settings';

const MapReducer = combineReducers({
	locations: locationDataReducer,         // location data
	imageDataCollection: svgImageReducer,   // map image data
	mapView: mapViewReducer,                // map view (pan/zoom) data
	widgetData: mapWidgetDataReducer,       // detail widget
	hoverData: mapHoverDataReducer,         // hover tip
	searchText: searchLocationReducer,      // search text
	settings: settingsReducer,              // basic settings
});

export default MapReducer;