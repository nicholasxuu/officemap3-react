import Immutable from 'immutable';
import { HOVER_LOCATION } from '../actions/map';

const hoverLocationReducer = (state = Immutable.fromJS({location: {}, posX: 0, posY: 0}), action) => {
	switch (action.type) {
		case HOVER_LOCATION:
			return Immutable.fromJS({
				location: action.locationObj,
				posX: action.posX,
				posY: action.posY,
			});
	}
	return state;
};

export default hoverLocationReducer;
