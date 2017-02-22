import Immutable from 'immutable';
import { MAP_SVG_PAN, MAP_SVG_ZOOM, MAP_CENTER_POSITION, SET_VIEWPORT_MATRIX } from '../actions/map';

/**
 *
 * @param {Immutable.Map} state
 * @param {SVGMatrix} viewportMatrix
 * @returns {Immutable.Map}
 */
const setViewportMatrix = (state, viewportMatrix) => {
	state = state.setIn(['viewportMatrix', 'a'], viewportMatrix.a);
	state = state.setIn(['viewportMatrix', 'b'], viewportMatrix.b);
	state = state.setIn(['viewportMatrix', 'c'], viewportMatrix.c);
	state = state.setIn(['viewportMatrix', 'd'], viewportMatrix.d);
	state = state.setIn(['viewportMatrix', 'e'], viewportMatrix.e);
	state = state.setIn(['viewportMatrix', 'f'], viewportMatrix.f);
	return state;
};



const mapViewReducer = (state = Immutable.fromJS({
	svgOffset: {
		x: 0,
		y: 0,
	},
	zoomScale: 1,
	viewportMatrix: {a: 1, b: 0, c:0, d:1, e:0, f:0},
}), action) => {

	switch (action.type) {
		case SET_VIEWPORT_MATRIX:
			state = setViewportMatrix(state, action.viewportMatrix);
			break;
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
		case MAP_CENTER_POSITION:
			// make svgPosX, svgPosY to be center of svg
			// make svgPosX, svgPosY go to width/2, height/2
			state = state.setIn(['svgOffset', 'x'], action.imageWidth / 2 - action.svgPosX);
			state = state.setIn(['svgOffset', 'y'], action.imageHeight / 2 - action.svgPosY);
			break;
		default:
	}

	return state;
};

export default mapViewReducer;