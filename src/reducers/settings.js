import Immutable from 'immutable';
import { RECEIVE_MAP_DATA } from '../actions/dataSync';

const defaultSettings = Immutable.fromJS({
	defaultImage: null,
	highPerformanceMode: true,
});

const settingsReducer = (state = defaultSettings, action) => {
	switch (action.type) {
		case RECEIVE_MAP_DATA:
			state = defaultSettings.merge(action.settings);
			break;
		default:
	}
	return state;
};

export default settingsReducer;
