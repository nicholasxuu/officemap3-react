import { RESPOND_GET, RESPOND_POST } from '../actions/dataSync';

const writeTokenReducer = (state = '', action) => {
	switch (action.type) {
		case RESPOND_GET:
		case RESPOND_POST:
			return action.token;
		default:
			return state
	}
};

export default writeTokenReducer;