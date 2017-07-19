// import Immutable from 'immutable';
import { FILTER_LOCATION, DEACTIVATE_SIDEBAR, ACTIVATE_SIDEBAR } from '../actions/sidebar';
import Immutable from 'immutable';

const defaultSidebarStatus = Immutable.fromJS({
	show: false,
	searchText: '',
});

const sidebarStatusReducer = (state = defaultSidebarStatus, action) => {
	switch (action.type) {
		case FILTER_LOCATION:
			if (action.searchText === '') {
				state = state.set('show', false);
			} else {
				state = state.set('show', true);
			}
			state = state.set('searchText', action.searchText);
			break;
		case ACTIVATE_SIDEBAR:
			state = state.set('show', true);
			break;
		case DEACTIVATE_SIDEBAR:
			state = state.set('show', false);
			break;
		default:
	}
	return state;
};

export default sidebarStatusReducer;