import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../actions/map';
import Map from '../components/Map';

const mapStateToProps = (state) => {
	return {
		locations: state.locations
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({  }, dispatch),
	}
};

const MapContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Map);

export default MapContainer;