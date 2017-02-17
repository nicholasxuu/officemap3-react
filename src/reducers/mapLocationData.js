import Immutable from 'immutable';
import { RECEIVE_MAP_DATA } from '../actions/dataSync';

const mapLocationDataReducer = (state = Immutable.fromJS([]), action) => {
	switch (action.type) {
		case RECEIVE_MAP_DATA:
			state = action.locations;
			break;
		default:
	}
	return state;
};

export default mapLocationDataReducer;