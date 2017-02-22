import Immutable from 'immutable';
import { RECEIVE_MAP_DATA } from '../actions/dataSync';

const svgImageReducer = (state = Immutable.fromJS({}), action) => {
	switch (action.type) {
		case RECEIVE_MAP_DATA:
			state = action.imageData;
			break;
		default:
	}
	return state;
};

export default svgImageReducer;
