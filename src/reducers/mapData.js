import Immutable from 'immutable';
import { REQUEST_GET, RESPOND_GET } from '../actions/dataSync';

const mapDataReducer = (state = Immutable.fromJS([]), action) => {
	switch (action.type) {
		case REQUEST_GET:
			break;
		case RESPOND_GET:
			state = action.locations;
			break;
		default:
	}
	return state;
};

export default mapDataReducer;
