import Immutable from 'immutable';
import { FETCH_MAP_DATA_SUCCESS, FILTER_LOCATION } from '../constants/ActionTypes';

/**
 *
 * @param {string} searchText
 * @param {Immutable.Map} locationObj
 * @returns {boolean}
 */
const searchLocationMatch = (searchText, locationObj) => {
  let sourceText = `${locationObj.get('name')} ${locationObj.get('description')} ${locationObj.get('tags')}`;
  sourceText = sourceText.toLowerCase();

  const tokens = searchText.toLowerCase().split(' ');

  const searchScore = tokens.reduce((currScore, token) => {
    if (sourceText.search(token) !== -1) {
      return currScore + 1;
    }
    return currScore;
  }, 0);
  return searchScore > tokens.length / 2;
};

const locationDataReducer = (state = Immutable.fromJS([]), action) => {
  switch (action.type) {
    case FETCH_MAP_DATA_SUCCESS:
      return state.mergeDeep(action.locations);
    case FILTER_LOCATION:
      return state.map((locationObj) => {
        if (action.searchText.length === 0) {
          return locationObj.remove('filterHide');
        } else if (searchLocationMatch(action.searchText, locationObj) === true) {
          return locationObj.set('filterHide', false);
        }
        return locationObj.set('filterHide', true);
      });
    default:
  }
  return state;
};

export default locationDataReducer;
