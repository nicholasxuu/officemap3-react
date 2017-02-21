import Immutable from 'immutable';
import { MAP_SHOW_WIDGET, MAP_MOVE_WIDGET } from '../actions/map';

const mapWidgetDataReducer = (state = Immutable.fromJS({
	location: {},
	pagePosX: 0,
	pagePosY: 0
}), action) => {
	switch (action.type) {
		case MAP_SHOW_WIDGET:
			break;
		case MAP_MOVE_WIDGET:
			state = state.set('pagePosX', action.pagePosX);
			state = state.set('pagePosY', action.pagePosY);
			break;
		default:
	}
	return state;
};

export default mapWidgetDataReducer;
