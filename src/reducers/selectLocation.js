import Immutable from 'immutable';
import { SELECT_LOCATION } from '../actions/map';

const selectLocationReducer = (state = Immutable.fromJS({}), action) => {
	switch (action.type) {
		case SELECT_LOCATION:
			return action.location;
	}
	return state;
};

export default selectLocationReducer;
