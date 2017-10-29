import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import {} from '../../actions/map';
import MapLocationList from './MapLocationList';

const mapStateToProps = state => ({
  locations: state.locations,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

const MapLocationListContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapLocationList));

export default MapLocationListContainer;
