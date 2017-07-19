export const FILTER_LOCATION = 'FILTER_LOCATION';
export const CLEAR_SEARCH_TEXT = 'CLEAR_SEARCH_TEXT';
export const DEACTIVATE_SIDEBAR = 'DEACTIVATE_SIDEBAR';
export const ACTIVATE_SIDEBAR = 'ACTIVATE_SIDEBAR';

export const filterLocation = (searchText) => {
	return {
		type: FILTER_LOCATION,
		searchText,
	}
};

export const clearSearchText = () => {
	return {
		type: FILTER_LOCATION,
		searchText: '',
	}
};

// search text unchanged, but deactivate sidebar
export const deactivateSidebar = () => {
	return {
		type: DEACTIVATE_SIDEBAR,
	}
};

// search text unchanged, but activate sidebar
export const activateSidebar = () => {
	return {
		type: ACTIVATE_SIDEBAR,
	}
};

