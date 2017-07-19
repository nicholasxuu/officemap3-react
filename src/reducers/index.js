import { combineReducers } from 'redux';
import locationDataReducer from './locationData';
import mapHoverDataReducer from './mapHoverData';
import mapWidgetDataReducer from './mapWidgetData';
import svgImageReducer from './svgImage';
import mapViewReducer from './mapView';
import settingsReducer from './settings';
import sidebarStatusReducer from './sidebar';

const MapReducer = combineReducers({
	locations: locationDataReducer,         // location data
	imageDataCollection: svgImageReducer,   // map image data
	mapView: mapViewReducer,                // map view (pan/zoom) status
	widgetData: mapWidgetDataReducer,       // detail widget
	hoverData: mapHoverDataReducer,         // hover tip
	settings: settingsReducer,              // basic settings
	sidebar: sidebarStatusReducer,          // sidebar status
});

export default MapReducer;