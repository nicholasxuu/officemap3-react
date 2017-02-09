import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions/map';
import MapBox from '../components/MapBox';

const mapStateToProps = (state) => {
	return state.locations;
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({}, dispatch),
	}
};

const MapBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapBox);

export default MapBoxContainer;