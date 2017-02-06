import { combineReducers } from 'redux';
import mapDataReducer from './mapData';
import writeTokenReducer from './writeToken';

const MapReducer = combineReducers({
	locations: mapDataReducer,
	token: writeTokenReducer,
});

export default MapReducer;