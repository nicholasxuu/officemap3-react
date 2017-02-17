import Immutable from 'immutable';
import { MAP_SVG_PAN, MAP_SVG_ZOOM } from '../actions/map';

const mapViewReducer = (state = Immutable.fromJS({
	panSvgDistance: {
		x: 0,
		y: 0,
	},
	zoomScale: 1,
}), action) => {
	switch (action.type) {
		case MAP_SVG_PAN:
			const currSvgDistanceX = state.getIn(['panSvgDistance', 'x']) + action.svgDistanceX;
			const currSvgDistanceY = state.getIn(['panSvgDistance', 'y']) + action.svgDistanceY;
			state = state.setIn(['panSvgDistance', 'x'], currSvgDistanceX);
			state = state.setIn(['panSvgDistance', 'y'], currSvgDistanceY);
			break;
		case MAP_SVG_ZOOM:
			const currZoomScale = state.getIn(['zoomScale']) + action.zoomScaleDelta;
			state = state.setIn(['zoomScale'], currZoomScale);
			break;
		default:
	}
	return state;
};

export default mapViewReducer;