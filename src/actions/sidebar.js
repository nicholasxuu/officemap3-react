export const FILTER_LOCATION = 'FILTER_LOCATION';
export const filterLocation = (searchText) => {
	return {
		type: FILTER_LOCATION,
		searchText,
	}
};
