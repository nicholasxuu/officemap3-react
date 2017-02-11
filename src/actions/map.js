export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const searchLocation = (searchText) => {
	return {
		type: SEARCH_LOCATION,
		searchText,
	}
};

export const SELECT_LOCATION = 'SELECT_LOCATION';
export const selectLocation = (elementId, locations, posX = 0, posY = 0) => {
	let locationObj = locations.find((location) => {
		return location.get('mapElementId') === elementId;
	});
	return {
		type: SELECT_LOCATION,
		locationObj,
		posX,
		posY,
	}
};

export const HOVER_LOCATION = 'HOVER_LOCATION';
export const hoverLocation = (locationObj, posX = 0, posY = 0) => {
	return {
		type: HOVER_LOCATION,
		locationObj,
		posX,
		posY,
	}
};