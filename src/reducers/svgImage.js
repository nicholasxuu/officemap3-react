import { RESPOND_GET } from '../actions/dataSync';

const svgImageReducer = (state = {
	width: 1,
	height: 1,
	url: "",
}, action) => {
	switch (action.type) {
		case RESPOND_GET:
			state = action.image;
		default:
	}
	return state;
};

export default svgImageReducer;
