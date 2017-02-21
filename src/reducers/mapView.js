import Immutable from 'immutable';
import { MAP_SVG_PAN, MAP_SVG_ZOOM, PAN_TO_LOCATION } from '../actions/map';

const mapViewReducer = (state = Immutable.fromJS({
	svgOffset: {
		x: 0,
		y: 0,
	},
	zoomScale: 1,
}), action) => {
	switch (action.type) {
		case MAP_SVG_PAN:
			const currSvgDistanceX = state.getIn(['svgOffset', 'x']) + action.svgDistanceX;
			const currSvgDistanceY = state.getIn(['svgOffset', 'y']) + action.svgDistanceY;
			state = state.setIn(['svgOffset', 'x'], currSvgDistanceX);
			state = state.setIn(['svgOffset', 'y'], currSvgDistanceY);
			break;
		case MAP_SVG_ZOOM:
			const currZoomScale = state.getIn(['zoomScale']) + action.zoomScaleDelta;
			state = state.setIn(['zoomScale'], currZoomScale);
			break;
		case PAN_TO_LOCATION:
			// center that location
			break;
		default:
	}
	return state;
};

export default mapViewReducer;