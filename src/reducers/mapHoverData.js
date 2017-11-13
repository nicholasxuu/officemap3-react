import Immutable from 'immutable';
import { MAP_SHOW_HOVERTIP, MAP_HIDE_HOVERTIP, MAP_MOVE_HOVERTIP } from '../constants/ActionTypes';

const defaultHoverData = Immutable.fromJS({
  locationObj: {},
  clientPosX: 0,
  clientPosY: 0,
});

const mapHoverDataReducer = (state = defaultHoverData, action) => {
  switch (action.type) {
    case MAP_SHOW_HOVERTIP:
      return state.set('locationObj', action.locationObj);
    case MAP_MOVE_HOVERTIP:
      return state
        .set('clientPosX', action.clientPosX)
        .set('clientPosY', action.clientPosY);
    case MAP_HIDE_HOVERTIP:
      return state.set('locationObj', Immutable.Map());
    default:
  }
  return state;
};

export default mapHoverDataReducer;
