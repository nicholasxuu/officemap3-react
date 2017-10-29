import Immutable from 'immutable';
import { MAP_SVG_PAN, MAP_SVG_ZOOM, MAP_CENTER_POSITION, SET_VIEWPORT_MATRIX, MAP_SWITCH_IMAGE, RESET_PAN_ZOOM } from '../actions/map';
import { RECEIVE_MAP_DATA } from '../actions/api';

/**
 *
 * @param {Immutable.Map} state
 * @param {SVGMatrix} viewportMatrix
 * @returns {Immutable.Map}
 */
const setViewportMatrix = (state, viewportMatrix) => {
  let nextState = state;
  nextState = nextState.setIn(['viewportMatrix', 'a'], viewportMatrix.a);
  nextState = nextState.setIn(['viewportMatrix', 'b'], viewportMatrix.b);
  nextState = nextState.setIn(['viewportMatrix', 'c'], viewportMatrix.c);
  nextState = nextState.setIn(['viewportMatrix', 'd'], viewportMatrix.d);
  nextState = nextState.setIn(['viewportMatrix', 'e'], viewportMatrix.e);
  nextState = nextState.setIn(['viewportMatrix', 'f'], viewportMatrix.f);
  return nextState;
};


const defaultMapView = Immutable.fromJS({
  svgOffset: {
    x: 0,
    y: 0,
  },
  zoomScale: 1,
  viewportMatrix: {
    a: 1, b: 0, c: 0, d: 1, e: 0, f: 0,
  },
  activeImageId: '',
});

const mapViewReducer = (state = defaultMapView, action) => {
  switch (action.type) {
    case RECEIVE_MAP_DATA: {
      if (!state.get('activeImageId')) {
        const defaultImage = action.settings.get('defaultImage');
        return state.set('activeImageId', defaultImage);
      }
      break;
    }
    case SET_VIEWPORT_MATRIX: {
      return setViewportMatrix(state, action.viewportMatrix);
    }
    case MAP_SVG_PAN: {
      const currSvgDistanceX = state.getIn(['svgOffset', 'x']) + action.svgDistanceX;
      const currSvgDistanceY = state.getIn(['svgOffset', 'y']) + action.svgDistanceY;
      return state
        .setIn(['svgOffset', 'x'], currSvgDistanceX)
        .setIn(['svgOffset', 'y'], currSvgDistanceY);
    }
    case MAP_SVG_ZOOM: {
      const currZoomScale = state.getIn(['zoomScale']) * (1 + action.zoomScaleDelta);
      if (currZoomScale > 0.1 && currZoomScale < 10) {
        return state.setIn(['zoomScale'], currZoomScale);
      }
      break;
    }
    case MAP_CENTER_POSITION: {
      // make svgPosX, svgPosY to be center of svg
      // make svgPosX, svgPosY go to width/2, height/2
      const mapCenterX = (action.imageWidth / 2) - action.svgPosX;
      const mapCenterY = (action.imageHeight / 2) - action.svgPosY;
      return state
        .setIn(['svgOffset', 'x'], mapCenterX)
        .setIn(['svgOffset', 'y'], mapCenterY);
    }
    case MAP_SWITCH_IMAGE: {
      const imageId = action.imageId;
      if (state.get('activeImageId') !== imageId) {
        return state.setIn(['activeImageId'], imageId);
      }
      break;
    }
    case RESET_PAN_ZOOM:
      return state
        .setIn(['zoomScale'], 1) // reset scale
        .setIn(['svgOffset', 'x'], 0) // reset pan x
        .setIn(['svgOffset', 'y'], 0); // reset pan y
    default:
  }

  return state;
};

export default mapViewReducer;
