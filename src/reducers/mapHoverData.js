import Immutable from 'immutable';
import { MAP_SHOW_HOVERTIP } from '../actions/map';

const mapHoverDataReducer = (state = Immutable.fromJS({location: {}, posX: 0, posY: 0}), action) => {
	switch (action.type) {
		case MAP_SHOW_HOVERTIP:
		default:
	}
	return state;
};

export default mapHoverDataReducer;
