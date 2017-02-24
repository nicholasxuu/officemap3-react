import Immutable from 'immutable';
import { RECEIVE_MAP_DATA } from '../actions/dataSync';

const settingsReducer = (state = Immutable.fromJS({}), action) => {
	switch (action.type) {
		case RECEIVE_MAP_DATA:
			state = action.settings;
			break;
		default:
	}
	return state;
};

export default settingsReducer;
