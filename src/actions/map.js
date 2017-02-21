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
		zoomScaleDelta
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


export const showWidgetData = (locationId) => {
	return {
		type: MAP_SHOW_WIDGET,
		locationId,
	}
};

export const centerAtPoint = (svgPos) => {
	return {
		type: MAP_CENTER_POSITION,
		svgPosX: svgPos.x,
		svgPosY: svgPos.y,
	}
};


/**
 *
 * @param mapElementId
 */
export const goToLocation = (mapElementId) => {

};
//
// export const panToLocation = () => {
// 	return {
// 		type: PAN_TO_LOCATION,
// 		mapElementId,
// 		centerPagePosX,
// 		centerPagePosY,
// 	}
// };