import Immutable from 'immutable';
import { REQUEST_GET, RESPOND_GET } from '../actions/dataSync';

const mapDataReducer = (state = Immutable.fromJS([]), action) => {
	switch (action.type) {
		case RESPOND_GET:
			state = action.locations;
			break;
	}
	return state;
};

export default mapDataReducer;
