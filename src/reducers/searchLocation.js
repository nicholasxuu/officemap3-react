import Immutable from 'immutable';
import { SEARCH_LOCATION } from '../actions/map';

const searchLocationReducer = (state = '', action) => {
	switch (action.type) {
		case SEARCH_LOCATION:
			state = action.searchText;
			break;
	}
	return state;
};

export default searchLocationReducer;