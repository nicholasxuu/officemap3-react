import { ACTIVATE_SIDEBAR, DEACTIVATE_SIDEBAR, FILTER_LOCATION } from '../constants/ActionTypes';

export const filterLocation = (searchText) => {
  // console.log('action: ' + searchText);
  return {
    type: FILTER_LOCATION,
    searchText,
  };
};

export const clearSearchText = () => ({
  type: FILTER_LOCATION,
  searchText: '',
});

// search text unchanged, but deactivate sidebar
export const deactivateSidebar = () => ({
  type: DEACTIVATE_SIDEBAR,
});

// search text unchanged, but activate sidebar
export const activateSidebar = () => ({
  type: ACTIVATE_SIDEBAR,
});

