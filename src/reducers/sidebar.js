// import Immutable from 'immutable';
import Immutable from 'immutable';
import { FILTER_LOCATION, DEACTIVATE_SIDEBAR, ACTIVATE_SIDEBAR } from '../constants/actions';

const defaultSidebarStatus = Immutable.fromJS({
  show: false,
  searchText: '',
});

const sidebarStatusReducer = (state = defaultSidebarStatus, action) => {
  switch (action.type) {
    case FILTER_LOCATION: {
      let nextState = state;
      if (action.searchText === '') {
        nextState = nextState.set('show', false);
      } else {
        nextState = nextState.set('show', true);
      }
      return nextState.set('searchText', action.searchText);
    }
    case ACTIVATE_SIDEBAR:
      return state.set('show', true);
    case DEACTIVATE_SIDEBAR:
      return state.set('show', false);
    default:
  }
  return state;
};

export default sidebarStatusReducer;
