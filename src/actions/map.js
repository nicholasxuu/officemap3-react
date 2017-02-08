export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const searchLocation = (searchText) => {
	return {
		type: SEARCH_LOCATION,
		searchText,
	}
};

export const SELECT_LOCATION = 'SELECT_LOCATION';
export const selectLocation = (locationObj) => {
	return {
		type: SELECT_LOCATION,
		locationObj,
	}
};

export const HOVER_LOCATION = 'HOVER_LOCATION';
export const hoverLocation = (locationObj) => {
	return {
		type: HOVER_LOCATION,
		locationObj,
	}
};