import Immutable from 'immutable';
import { MAP_SVG_PAN, MAP_SVG_ZOOM } from '../actions/map';

const mapViewReducer = (state = Immutable.Map({
	panSvgDistance: {
		x: 0,
		y: 0,
	},
	zoomScale: 1,
}), action) => {
	switch (action.type) {
		case MAP_SVG_PAN:
			state.setIn(['panSvgDistance', 'x'], state.getIn(['panSvgDistance', 'x']) + action.svgDistanceX);
			state.setIn(['panSvgDistance', 'y'], state.getIn(['panSvgDistance', 'y']) + action.svgDistanceY);
			break;
		case MAP_SVG_ZOOM:
			state.setIn(['zoomScale'], state.getIn(['zoomScale'] + action.zoomScaleDelta));
			break;
		default:
	}
	return state;
};

export default mapViewReducer;
