import { combineReducers } from 'redux';
import mapDataReducer from './mapData';
import writeTokenReducer from './writeToken';
import searchLocationReducer from './searchLocation';
import hoverLocationReducer from './hoverLocation';
import selectLocationReducer from './selectLocation';

const MapReducer = combineReducers({
	locations: mapDataReducer,
	token: writeTokenReducer,
	searchText: searchLocationReducer,
	hoverLocation: hoverLocationReducer,
	selectLocation: selectLocationReducer,
});

export default MapReducer;