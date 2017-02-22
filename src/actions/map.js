import { getShapeCenter } from '../utils/svgShapeUtils';

export const SET_VIEWPORT_MATRIX = 'SET_VIEWPORT_MATRIX';
export const MAP_CENTER_POSITION = 'MAP_CENTER_POSITION';
export const PAN_TO_LOCATION = 'PAN_TO_LOCATION';
export const MAP_SVG_PAN = 'MAP_SVG_PAN';
export const MAP_SVG_ZOOM = 'MAP_SVG_ZOOM';
export const MAP_SHOW_HOVERTIP = 'MAP_SHOW_HOVERTIP';
export const MAP_MOVE_HOVERTIP = 'MAP_MOVE_HOVERTIP';
export const MAP_HIDE_HOVERTIP = 'MAP_HIDE_HOVERTIP';
export const MAP_SHOW_WIDGET = 'MAP_SHOW_WIDGET';
export const MAP_MOVE_WIDGET = 'MAP_MOVE_WIDGET';
export const MAP_HIDE_WIDGET = 'MAP_HIDE_WIDGET';

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
 * @param {SVGMatrix} viewportMatrix
 */
export const svgPan = (svgDistanceX, svgDistanceY, viewportMatrix) => {
	return {
		type: MAP_SVG_PAN,
		svgDistanceX,
		svgDistanceY,
		viewportMatrix,
	}
};

/**
 * Zoom image by certain percent
 * @param {float} zoomScaleDelta - zoom scale change, between -1 and 1.
 * @param {SVGMatrix} viewportMatrix
 */
export const svgZoom = (zoomScaleDelta, viewportMatrix) => {
	return {
		type: MAP_SVG_ZOOM,
		zoomScaleDelta,
		viewportMatrix,
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
			const location = locations.find(location => {
				return location.get('mapElementId') === mapElementId;
			});

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

export const moveSvgCenter = (svgPos, imageDimension, viewportMatrix) => {
	return {
		type: MAP_CENTER_POSITION,
		svgPosX: svgPos.x,
		svgPosY: svgPos.y,
		imageHeight: imageDimension.height,
		imageWidth: imageDimension.width,
		viewportMatrix,
	}
};

export const centerAtPoint = (svgPos, viewportMatrix) => {
	return (dispatch, getState) => {
		const currState = getState();

		const imageWidth = currState.imageData.get('width');
		const imageHeight = currState.imageData.get('height');
		const imageDimension = {width: imageWidth, height: imageHeight};
		dispatch(moveSvgCenter(svgPos, imageDimension, viewportMatrix));
		dispatch(hideHoverData());
		dispatch(hideDetailWidget());
	}
};

/**
 *
 * @param mapElementId
 */
export const goToLocation = (mapElementId) => {
	return (dispatch, getState) => {
		const currState = getState();

		if (currState.widgetData.get('location').isEmpty() ||
			currState.widgetData.getIn(['location', 'mapElementId']) !== mapElementId
		) {
			const location = currState.locations.find(location => {
				return location.get('mapElementId') === mapElementId;
			});

			dispatch(showDetailWidget(location));
		}

		// get element center svg pos
		const element = currState.imageData.get('elements').find(element => {
			return element.get('id') === mapElementId;
		});
		const elementCenter = getShapeCenter(element);

		dispatch(moveDetailWidget(elementCenter));

		dispatch(hideHoverData());
	}
};