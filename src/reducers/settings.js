import Immutable from 'immutable';
import { RECEIVE_MAP_DATA } from '../actions/dataSync';

const defaultSettings = Immutable.fromJS({
	defaultImage: null,
	sidebarType: 'search',
	highPerformanceMode: true,
});

const settingsReducer = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_MAP_DATA:
			state = defaultSettings.merge(action.settings);
			break;
		default:
	}
	return state;
};

export default settingsReducer;
