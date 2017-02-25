export const FILTER_LOCATION = 'FILTER_LOCATION';
export const filterLocation = (searchText) => {
	return {
		type: FILTER_LOCATION,
		searchText,
	}
};

export const CLEAR_SEARCH_TEXT = 'CLEAR_SEARCH_TEXT';
export const clearSearchText = () => {
	return {
		type: FILTER_LOCATION,
		searchText: '',
	}
};