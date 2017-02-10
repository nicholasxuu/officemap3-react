import Immutable from 'immutable';
import { SELECT_LOCATION } from '../actions/map';

const selectLocationReducer = (state = Immutable.fromJS({location: {}, posX: 0, posY: 0}), action) => {
	switch (action.type) {
		case SELECT_LOCATION:
			return Immutable.fromJS({
				location: action.locationObj,
				posX: action.posX,
				posY: action.posY,
			});
	}
	return state;
};

export default selectLocationReducer;
