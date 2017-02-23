// import Immutable from 'immutable';
import { FILTER_LOCATION } from '../actions/sidebar';

const searchLocationReducer = (state = '', action) => {
	switch (action.type) {
		case FILTER_LOCATION:
			state = action.searchText;
			break;
		default:
	}
	return state;
};

export default searchLocationReducer;