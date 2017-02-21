import Immutable from 'immutable';
import { MAP_SHOW_HOVERTIP, MAP_HIDE_HOVERTIP, MAP_MOVE_HOVERTIP } from '../actions/map';

const mapHoverDataReducer = (state = Immutable.fromJS({
	location: {},
	clientPosX: 0,
	clientPosY: 0
}), action) => {
	switch (action.type) {
		case MAP_SHOW_HOVERTIP:
			state = state.set('location', action.location);
			break;
		case MAP_MOVE_HOVERTIP:
			state = state.set('clientPosX', action.clientPosX);
			state = state.set('clientPosY', action.clientPosY);
			break;
		case MAP_HIDE_HOVERTIP:
			state = state.set('location', Immutable.Map({}));
			break;
		default:
	}
	return state;
};

export default mapHoverDataReducer;
