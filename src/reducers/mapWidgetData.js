import Immutable from 'immutable';
import { MAP_SHOW_WIDGET, MAP_MOVE_WIDGET, MAP_HIDE_WIDGET } from '../actions/map';

const defaultWidgetData = Immutable.fromJS({
	locationObj: {},
	svgPos: {
		x: 0,
		y: 0,
	}
});

// Note: using svg pos so component can calculate its position when rendering
//    By doing this, detail widget position need to be calculated every time component is re-rendered.
//    related states: mapView, mapWidgetData
//    i.e. pan, zoom, widget show/hide/move
const mapWidgetDataReducer = (state = defaultWidgetData, action) => {
	switch (action.type) {
		case MAP_SHOW_WIDGET:
			state = state.set('locationObj', action.locationObj);
			break;
		case MAP_MOVE_WIDGET:
			// more like set widget position
			state = state.setIn(['svgPos', 'x'], action.svgPosX);
			state = state.setIn(['svgPos', 'y'], action.svgPosY);
			break;
		case MAP_HIDE_WIDGET:
			state = state.set('locationObj', Immutable.Map({}));
			break;
		default:
	}
	return state;
};

export default mapWidgetDataReducer;
