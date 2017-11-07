import Immutable from 'immutable';
import { FETCH_MAP_DATA_SUCCESS } from '../constants/actions';

export const LOCATION_SVG_ATTRIBUTES_KEY = 'svgAttributes';

const svgImageReducer = (state = Immutable.fromJS({}), action) => {
  switch (action.type) {
    case FETCH_MAP_DATA_SUCCESS: {
      const nextState = action.imageDataCollection;

      // build mapElementId => location map.
      const elementLocationAttributeMap = {};
      const locationCount = action.locations.size;

      for (let i = 0; i < locationCount; i += 1) {
        const locationObj = action.locations.get(i);
        const mapElementId = locationObj.get('mapElementId');

        if (locationObj.has(LOCATION_SVG_ATTRIBUTES_KEY)) {
          elementLocationAttributeMap[mapElementId] = locationObj.get(LOCATION_SVG_ATTRIBUTES_KEY);
        }
      }

      // update state with location specific attribute data.
      return nextState.map(image =>
        image.set(
          'elements',
          image
            .get('elements')
            .map((element) => {
              const mapElementId = element.get('id');
              if (elementLocationAttributeMap[mapElementId]) {
                return element.merge(elementLocationAttributeMap[mapElementId]);
              }
              return element;
            }),
        ));
    }
    default:
  }
  return state;
};

export default svgImageReducer;
