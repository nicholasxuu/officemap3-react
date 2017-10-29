import Immutable from 'immutable';
import { RECEIVE_MAP_DATA } from '../actions/api';

const defaultSettings = Immutable.fromJS({
  defaultImage: null,
  highPerformanceMode: true,
});

const settingsReducer = (state = defaultSettings, action) => {
  switch (action.type) {
    case RECEIVE_MAP_DATA:
      return defaultSettings.merge(action.settings);
    default:
  }
  return state;
};

export default settingsReducer;
