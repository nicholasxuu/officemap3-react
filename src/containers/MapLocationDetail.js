import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions/map';
import MapLocationDetail from '../components/MapLocationDetail';

const mapStateToProps = (state) => {
	return {
		show: !state.selectLocation.get('location').isEmpty(),
		location: state.selectLocation.get('location'),
		posX: state.selectLocation.get('posX'),
		posY: state.selectLocation.get('posY'),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({}, dispatch),
	}
};

const MapLocationDetailContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapLocationDetail);

export default MapLocationDetailContainer;