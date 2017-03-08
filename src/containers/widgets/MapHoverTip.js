import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../../actions/map';
import MapHoverTip from '../../components/widgets/MapHoverTip';

const mapStateToProps = (state) => {
	let show = false;
	if (!state.hoverData.get('location').isEmpty()) {
		show = true;
	}

	return {
		show: show,
		clientPosX: state.hoverData.get('clientPosX'),
		clientPosY: state.hoverData.get('clientPosY'),
		location: state.hoverData.get('location'),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({}, dispatch),
	}
};

const MapHoverTipReducer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapHoverTip);

export default MapHoverTipReducer;