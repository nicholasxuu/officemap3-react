import Immutable from 'immutable';
import { RECEIVE_MAP_DATA } from '../actions/api';

export const LOCATION_SVG_ATTRIBUTES_KEY = 'svgAttributes';

const svgImageReducer = (state = Immutable.fromJS({}), action) => {
	switch (action.type) {
		case RECEIVE_MAP_DATA:
			state = action.imageDataCollection;

			// build mapElementId => location map.
			let elementLocationAttributeMap = {};
			const locationCount = action.locations.size;
			for (let i = 0; i < locationCount; i++) {
				const locationObj = action.locations.get(i);
				const mapElementId = locationObj.get('mapElementId');
				if (locationObj.has(LOCATION_SVG_ATTRIBUTES_KEY)) {
					elementLocationAttributeMap[mapElementId] = locationObj.get(LOCATION_SVG_ATTRIBUTES_KEY);
				}
			}

			// update state with location specific attribute data.
			state = state.map(image => {
				return image.set('elements', image.get('elements').map(element => {
					const mapElementId = element.get('id');
					if (elementLocationAttributeMap[mapElementId]) {
						element = element.merge(elementLocationAttributeMap[mapElementId]);
					}
					return element;
				}))
			});

			break;
		default:
	}
	return state;
};

export default svgImageReducer;
