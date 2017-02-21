import Immutable from 'immutable';
import { RECEIVE_MAP_DATA } from '../actions/dataSync';
import { FILTER_LOCATION } from '../actions/sidebar';

const searchLocationMatch = (searchText, location) => {
	return location.get('name').search(searchText) !== -1 ||
		location.get('info').search(searchText) !== -1
};

const mapLocationDataReducer = (state = Immutable.fromJS([]), action) => {
	switch (action.type) {
		case RECEIVE_MAP_DATA:
			state = action.locations;
			break;
		case FILTER_LOCATION:
			state = state.map(location => {
				if (action.searchText.length === 0 ||
					searchLocationMatch(action.searchText, location) === true
				) {
					location = location.set('hide', false);
				} else {
					location = location.set('hide', true);
				}
				return location;
			});
			break;
		default:
	}
	return state;
};

export default mapLocationDataReducer;
