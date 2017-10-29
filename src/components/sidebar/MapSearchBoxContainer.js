import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { filterLocation } from '../../actions/sidebar';
import MapSearchBox from './MapSearchBox';

const mapStateToProps = (state) => {
  return {
    searchText: state.sidebar.get('searchText'),
    isLocationListHidden: !state.sidebar.get('show'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      filterLocation,
    }, dispatch),
  };
};

const MapSearchBoxContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapSearchBox));

export default MapSearchBoxContainer;