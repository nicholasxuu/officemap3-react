import Immutable from 'immutable';
import { MAP_SHOW_HOVERTIP, MAP_HIDE_HOVERTIP, MAP_MOVE_HOVERTIP } from '../actions/map';

const defaultHoverData = Immutable.fromJS({
  locationObj: {},
  clientPosX: 0,
  clientPosY: 0,
});

const mapHoverDataReducer = (state = defaultHoverData, action) => {
  switch (action.type) {
    case MAP_SHOW_HOVERTIP:
      state = state.set('locationObj', action.locationObj);
      break;
    case MAP_MOVE_HOVERTIP:
      state = state.set('clientPosX', action.clientPosX);
      state = state.set('clientPosY', action.clientPosY);
      break;
    case MAP_HIDE_HOVERTIP:
      state = state.set('locationObj', Immutable.Map());
      break;
    default:
  }
  return state;
};

export default mapHoverDataReducer;
