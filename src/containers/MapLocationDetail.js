import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions/map';
import MapLocationDetail from '../components/MapLocationDetail';

const mapStateToProps = (state) => {
	return {};
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