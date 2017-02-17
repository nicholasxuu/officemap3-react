export const MAP_CENTER_POSITION = 'MAP_CENTER_POSITION';
export const centerAtPoint = (svgPos) => {
	return {
		type: MAP_CENTER_POSITION,
		svgPosX: svgPos.x,
		svgPosY: svgPos.y,
	}
};

export const MAP_SVG_PAN = 'MAP_SVG_PAN';
export const svgPan = (svgDistanceX, svgDistanceY) => {
	return {
		type: MAP_SVG_PAN,
		svgDistanceX,
		svgDistanceY,
	}
};

export const MAP_SVG_ZOOM = 'MAP_SVG_ZOOM';
export const svgZoom = (zoomScaleDelta) => {
	return {
		type: MAP_SVG_ZOOM,
		zoomScaleDelta
	}
};

export const MAP_SHOW_HOVERTIP = 'MAP_SHOW_HOVERTIP';
export const showHoverData = (locationId, clientPos) => {
	return {
		type: MAP_SHOW_HOVERTIP,
		locationId,
		clientPosX: clientPos.x,
		clientPosY: clientPos.y,
	}
};

export const MAP_SHOW_WIDGET = 'MAP_SHOW_WIDGET';
export const showWidgetData = (locationId) => {
	return {
		type: MAP_SHOW_WIDGET,
		locationId,
	}
};

