export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const searchLocation = (searchText) => {
	return {
		type: SEARCH_LOCATION,
		searchText,
	}
};

export const HIDE_SIDEBAR = 'HIDE_SIDEBAR';
export const hideSidebar = () => {
	return {
		type: HIDE_SIDEBAR,
	}
};

export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
export const showSidebar = () => {
	return {
		type: SHOW_SIDEBAR,
	}
};