import Immutable from 'immutable';
import { MAP_SHOW_WIDGET } from '../actions/map';

const mapWidgetDataReducer = (state = Immutable.fromJS({location: {}, posX: 0, posY: 0}), action) => {
	switch (action.type) {
		case MAP_SHOW_WIDGET:
		default:
	}
	return state;
};

export default mapWidgetDataReducer;
