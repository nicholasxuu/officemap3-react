import { combineReducers } from 'redux';
import mapLocationDataReducer from './mapLocationData';
import searchLocationReducer from './searchLocation';
import mapHoverDataReducer from './mapHoverData';
import mapWidgetDataReducer from './mapWidgetData';
import svgImageReducer from './svgImage';
import mapViewReducer from './mapView';

const MapReducer = combineReducers({
	locations: mapLocationDataReducer,
	imageDataList: svgImageReducer,
	mapView: mapViewReducer,
	widgetData: mapWidgetDataReducer,
	hoverData: mapHoverDataReducer,
	searchText: searchLocationReducer,
});

export default MapReducer;