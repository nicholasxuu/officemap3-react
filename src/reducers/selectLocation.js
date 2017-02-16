import Immutable from 'immutable';
import { SELECT_LOCATION, REACH_LOCATION } from '../actions/map';

const selectLocationReducer = (state = Immutable.fromJS({location: {}, posX: 0, posY: 0}), action) => {
	switch (action.type) {
		case REACH_LOCATION:
			return Immutable.fromJS({
				location: action.locationObj,
				posX: 700, // todo: width / 2
				posY: 700, // todo: height / 2
			});
		case SELECT_LOCATION:
			return Immutable.fromJS({
				location: action.locationObj,
				posX: action.posX,
				posY: action.posY,
			});
		default:
	}
	return state;
};

export default selectLocationReducer;
