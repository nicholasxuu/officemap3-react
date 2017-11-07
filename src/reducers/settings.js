import Immutable from 'immutable';
import { FETCH_MAP_DATA_SUCCESS } from '../constants/actions';

const defaultSettings = Immutable.fromJS({
  defaultImage: null,
  highPerformanceMode: true,
});

const settingsReducer = (state = defaultSettings, action) => {
  switch (action.type) {
    case FETCH_MAP_DATA_SUCCESS:
      return defaultSettings.merge(action.settings);
    default:
  }
  return state;
};

export default settingsReducer;
