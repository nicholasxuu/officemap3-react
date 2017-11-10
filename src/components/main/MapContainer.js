import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Map from './Map';
import { goToLocation } from '../../actions/map';
import { filterLocation } from '../../actions/sidebar';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    goToLocation,
    filterLocation,
  }, dispatch),
});

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);

export default MapContainer;
