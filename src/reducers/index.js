import { combineReducers } from 'redux';
import mapDataReducer from './mapData';
import writeTokenReducer from './writeToken';

const OfficeMapReducer = combineReducers({
	lists: mapDataReducer,
	token: writeTokenReducer,
});

export default OfficeMapReducer;