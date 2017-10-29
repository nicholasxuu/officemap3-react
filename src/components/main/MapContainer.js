import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../../actions/map';
import Map from './Map';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ }, dispatch),
});

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);

export default MapContainer;
