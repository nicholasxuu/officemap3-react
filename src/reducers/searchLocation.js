// import Immutable from 'immutable';
import { SEARCH_LOCATION } from '../actions/sidebar';

const searchLocationReducer = (state = '', action) => {
	switch (action.type) {
		case SEARCH_LOCATION:
			state = action.searchText;
			break;
		default:
	}
	return state;
};

export default searchLocationReducer;