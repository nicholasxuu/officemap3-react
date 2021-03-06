import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { clearSearchText, deactivateSidebar, activateSidebar } from '../../actions/sidebar';
import { clearMap } from '../../actions/map';
import MapSidebar from './MapSidebar';

const mapStateToProps = (state) => {
  const searchText = state.sidebar.get('searchText');

  const isLocationListHidden = !state.sidebar.get('show');

  return {
    searchText,
    isLocationListHidden,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    clearSearchText,
    activateSidebar,
    deactivateSidebar,
    clearMap,
  }, dispatch),
});

const MapSidebarContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapSidebar));

export default MapSidebarContainer;
