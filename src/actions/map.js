export const MAP_CENTER_POSITION = 'MAP_CENTER_POSITION';
export const centerLocation      = (svgPos) => {
	return {
		type: MAP_CENTER_POSITION,
		svgPosX: svgPos.x,
		svgPosY: svgPos.y,
	}
};

export const MAP_SHOW_HOVERTIP = 'MAP_SHOW_HOVERTIP';
export const showHoverData     = (locationId, clientPos) => {
	return {
		type: MAP_SHOW_HOVERTIP,
		locationId,
		clientPosX: clientPos.x,
		clientPosY: clientPos.y,
	}
};

export const MAP_SHOW_WIDGET = 'MAP_SHOW_WIDGET';
export const showWidgetData  = (locationId) => {
	return {
		type: MAP_SHOW_WIDGET,
		locationId,
	}
};