import Immutable from 'immutable';
import { MAP_SHOW_WIDGET, MAP_MOVE_WIDGET, MAP_HIDE_WIDGET } from '../constants/ActionTypes';

const defaultWidgetData = Immutable.fromJS({
  locationObj: {},
  svgPos: {
    x: 0,
    y: 0,
  },
});

// Note: using svg pos so component can calculate its position when rendering
//    By doing this, detail widget position need to be calculated
//    every time component is re-rendered.
//    related states: mapView, mapWidgetData
//    i.e. pan, zoom, widget show/hide/move
const mapWidgetDataReducer = (state = defaultWidgetData, action) => {
  switch (action.type) {
    case MAP_SHOW_WIDGET:
      return state.set('locationObj', action.locationObj);
    case MAP_MOVE_WIDGET:
      // more like set widget position
      return state
        .setIn(['svgPos', 'x'], action.svgPosX)
        .setIn(['svgPos', 'y'], action.svgPosY);
    case MAP_HIDE_WIDGET:
      return state.set('locationObj', Immutable.Map());
    default:
  }
  return state;
};

export default mapWidgetDataReducer;
