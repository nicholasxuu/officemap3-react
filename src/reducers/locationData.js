import Immutable from 'immutable';
import { RECEIVE_MAP_DATA } from '../actions/dataSync';
import { FILTER_LOCATION } from '../actions/sidebar';

const searchLocationMatch = (searchText, location) => {
	let sourceText = location.get('name') + " " + location.get('description') + " " + location.get('tags');
	sourceText = sourceText.toLowerCase();

	const tokens = searchText.toLowerCase().split(" ");

	let searchScore = 0;
	for (let token of tokens) {
		if (sourceText.search(token) !== -1) {
			searchScore++;
		}
	}
	return searchScore > tokens.length / 2;

};

const locationDataReducer = (state = Immutable.fromJS([]), action) => {
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

export default locationDataReducer;
