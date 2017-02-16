export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const searchLocation = (searchText) => {
	return {
		type: SEARCH_LOCATION,
		searchText,
	}
};

export const SELECT_LOCATION = 'SELECT_LOCATION';
export const selectLocation = (locationObj, posX = 0, posY = 0) => {
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

export const REACH_LOCATION = 'REACH_LOCATION';
export const reachLocation = (locationObj) => {
	return {
		type: REACH_LOCATION,
		locationObj,
	}
};