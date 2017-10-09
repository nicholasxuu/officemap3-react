import SvgShapeUtils from '../utils/SvgShapeUtils';
import LocationUtils from '../utils/LocationUtils';
import ImageDataUtils  from '../utils/ImageDataUtils';
import { deactivateSidebar } from "./sidebar";

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
export const RESET_PAN_ZOOM = 'RESET_PAN_ZOOM';

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
export const showHoverTip = (locationObj) => {
	return {
		type: MAP_SHOW_HOVERTIP,
		locationObj,
	}
};


export const moveHoverTip = (clientPos) => {
	return {
		type: MAP_MOVE_HOVERTIP,
		clientPosX: clientPos.x,
		clientPosY: clientPos.y,
	}
};

export const switchImage = (imageId) => {
	return {
		type: MAP_SWITCH_IMAGE,
		imageId,
	}
};

export const resetPanZoom = () => {
	return {
		type: RESET_PAN_ZOOM,
	}
};


export const hideHoverData = () => {
	return {
		type: MAP_HIDE_HOVERTIP,
	}
};


export const showDetailWidget = (locationObj) => {
	return {
		type: MAP_SHOW_WIDGET,
		locationObj,
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
		if (hoverData.get('locationObj').isEmpty() ||
			hoverData.getIn(['locationObj', 'mapElementId']) !== mapElementId
		) {
			const locationObj = LocationUtils.findLocationByMapElementId(locations, mapElementId);

			dispatch(showHoverTip(locationObj));
		}
		dispatch(moveHoverTip(clientPos));
	}
};

export const centerAtPoint = (svgPos) => {
	return (dispatch, getState) => {
		const currState = getState();

		const activeImageId = currState.mapView.get('activeImageId');
		const imageWidth = currState.imageDataCollection.get(activeImageId).get('width');
		const imageHeight = currState.imageDataCollection.get(activeImageId).get('height');
		const imageDimension = {width: imageWidth, height: imageHeight};
		dispatch(moveSvgCenter(svgPos, imageDimension));
	}
};

// clear widgets on map
export const clearMap = () => {
	return (dispatch, getState) => {
		dispatch(hideDetailWidget());
	}
};

// clear widgets and center map
export const resetMap = () => {
	return (dispatch, getState) => {
		dispatch(clearMap());

		dispatch(resetPanZoom());
	}
};

/**
 * Show detail widget of a location, and center the map at it if needed
 * @param {string} mapElementId
 * @param {boolean} centerAtLocation
 */
export const goToLocation = (mapElementId, centerAtLocation = false) => {
	return (dispatch, getState) => {
		const currState = getState();

		if (currState.widgetData.get('locationObj').isEmpty() ||
			currState.widgetData.getIn(['locationObj', 'mapElementId']) !== mapElementId
		) {
			const locationObj = LocationUtils.findLocationByMapElementId(currState.locations, mapElementId);

			dispatch(showDetailWidget(locationObj));
		}

		// get element center svg pos
		let { imageId, element } = ImageDataUtils.findElementByMapElementId(currState.imageDataCollection, mapElementId);
		if (element === null) {
			return;
		}
		const elementCenter = SvgShapeUtils.getShapeCenter(element);

		dispatch(switchImage(imageId));

		dispatch(moveDetailWidget(elementCenter));

		dispatch(hideHoverData());

		dispatch(deactivateSidebar());

		if (centerAtLocation === true) {
			dispatch(centerAtPoint(elementCenter));
		}
	}
};
