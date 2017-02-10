import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectLocation, hoverLocation } from '../actions/map';
import MapBox from '../components/MapBox';

const mapStateToProps = (state) => {
	return {
		locations: state.locations,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({selectLocation, hoverLocation}, dispatch),
	}
};

const MapBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(MapBox);

export default MapBoxContainer;