import Immutable from 'immutable';
import { RECEIVE_MAP_DATA } from '../actions/dataSync';
import { FILTER_LOCATION } from '../actions/sidebar';

const searchLocationMatch = (searchText, locationObj) => {
	let sourceText = locationObj.get('name') + " " + locationObj.get('description') + " " + locationObj.get('tags');
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
			state = state.mergeDeep(action.locations);
			break;
		case FILTER_LOCATION:
			state = state.map(locationObj => {
				if (action.searchText.length === 0) {
					locationObj = locationObj.remove('filterHide');
				} else if (searchLocationMatch(action.searchText, locationObj) === true) {
					locationObj = locationObj.set('filterHide', false);
				} else {
					locationObj = locationObj.set('filterHide', true);
				}
				return locationObj;
			});
			break;
		default:
	}
	return state;
};

export default locationDataReducer;
