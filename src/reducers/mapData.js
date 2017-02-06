import Immutable from 'immutable';
import {  } from '../actions/map';
import { REQUEST_GET, RESPOND_GET } from '../actions/dataSync';

const mapDataReducer = (state = Immutable.fromJS([]), action) => {
	switch (action.type) {
		case RESPOND_GET:
			return action.locations;
	}
	return state;
};

export default mapDataReducer;