import Immutable from 'immutable';
import { HOVER_LOCATION } from '../actions/map';

const hoverLocationReducer = (state = Immutable.fromJS({}), action) => {
	switch (action.type) {
		case HOVER_LOCATION:
			return action.location;
	}
	return state;
};

export default hoverLocationReducer;
