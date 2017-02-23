import { getShapeCenter } from '../utils/svgShapeUtils';
import { findLocationByMapElementId } from '../utils/locationUtils';
import { findElementByMapElementId } from '../utils/imageDataUtils';

export const SET_VIEWPORT_MATRIX = 'SET_VIEWPORT_MATRIX';
export const MAP_CENTER_POSITION = 'MAP_CENTER_POSITION';
export const MAP_SVG_PAN = 'MAP_SVG_PAN';
export const MAP_SVG_ZOOM = 'MAP_SVG_ZOOM';
export const MAP_SHOW_HOVERTIP = 'MAP_SHOW_HOVERTIP';
export const MAP_MOVE_HOVERTIP = 'MAP_MOVE_HOVERTIP';
export const MAP_HIDE_HOVERTIP = 'MAP_HIDE_HOVERTIP';
export const MAP_SHOW_WIDGET = 'MAP_SHOW_WIDGET';
export const MAP_MOVE_WIDGET = 'MAP_MOVE_WIDGET';
export const MAP_HIDE_WIDGET = 'MAP_HIDE_WIDGET';
export const MAP_SWITCH_IMAGE = 'MAP_SWITCH_IMAGE';

export const setViewportMatrix = (viewportMatrix) => {
	return {
		type: SET_VIEWPORT_MATRIX,
		viewportMatrix
	}
};

/**
 * Pan 2D image by certain svg distance
 * @param {int} svgDistanceX - svg distance on x axis
 * @param {int} svgDistanceY - svg distance on y axis
 */
export const svgPan = (svgDistanceX, svgDistanceY) => {
	return {
		type: MAP_SVG_PAN,
		svgDistanceX,
		svgDistanceY,
	}
};

/**
 * Zoom image by certain percent
 * @param {float} zoomScaleDelta - zoom scale change, between -1 and 1.
 */
export const svgZoom = (zoomScaleDelta) => {
	return {
		type: MAP_SVG_ZOOM,
		zoomScaleDelta,
	}
};

/**
 * Show hover tip with location data
 */
export const showHoverTip = (location) => {
	return {
		type: MAP_SHOW_HOVERTIP,
		location: location,
	}
};


export const moveHoverTip = (clientPos) => {
	return {
		type: MAP_MOVE_HOVERTIP,
		clientPosX: clientPos.x,
		clientPosY: clientPos.y,
	}
};

/**
 * Redux-thunk function, to help find element.
 * @param mapElementId
 * @param clientPos
 * @returns {function(*, *)}
 */
export const showHoverData = (mapElementId, clientPos) => {
	return (dispatch, getState) => {
		const currState = getState();
		const locations = currState.locations;
		const hoverData = currState.hoverData;
		if (hoverData.get('location').isEmpty() ||
			hoverData.getIn(['location', 'mapElementId']) !== mapElementId
		) {
			const location = findLocationByMapElementId(locations, mapElementId);

			dispatch(showHoverTip(location));
		}
		dispatch(moveHoverTip(clientPos));
	}
};


export const hideHoverData = () => {
	return {
		type: MAP_HIDE_HOVERTIP,
	}
};


export const showDetailWidget = (location) => {
	return {
		type: MAP_SHOW_WIDGET,
		location,
	}
};

export const moveDetailWidget = (svgPos) => {
	return {
		type: MAP_MOVE_WIDGET,
		svgPosX: svgPos.x,
		svgPosY: svgPos.y,
	}
};

export const hideDetailWidget = () => {
	return {
		type: MAP_HIDE_WIDGET,
	}
};

export const moveSvgCenter = (svgPos, imageDimension) => {
	return {
		type: MAP_CENTER_POSITION,
		svgPosX: svgPos.x,
		svgPosY: svgPos.y,
		imageHeight: imageDimension.height,
		imageWidth: imageDimension.width,
	}
};

export const centerAtPoint = (svgPos) => {
	return (dispatch, getState) => {
		const currState = getState();

		const imageWidth = currState.imageDataList.get(0).get('width');
		const imageHeight = currState.imageDataList.get(0).get('height');
		const imageDimension = {width: imageWidth, height: imageHeight};
		dispatch(moveSvgCenter(svgPos, imageDimension));
	}
};

/**
 * Show detail widget of a location, and center the map at it if needed
 * @param {string} mapElementId
 * @param {bool} centerAtLocation
 */
export const goToLocation = (mapElementId, centerAtLocation = false) => {
	return (dispatch, getState) => {
		const currState = getState();

		if (currState.widgetData.get('location').isEmpty() ||
			currState.widgetData.getIn(['location', 'mapElementId']) !== mapElementId
		) {
			const location = findLocationByMapElementId(currState.locations, mapElementId);

			dispatch(showDetailWidget(location));
		}

		// get element center svg pos
		const element = findElementByMapElementId(currState.imageDataList, mapElementId);
		if (element === null) {
			return;
		}
		const elementCenter = getShapeCenter(element);

		dispatch(moveDetailWidget(elementCenter));

		dispatch(hideHoverData());

		if (centerAtLocation === true) {
			dispatch(centerAtPoint(elementCenter));
		}
	}
};
