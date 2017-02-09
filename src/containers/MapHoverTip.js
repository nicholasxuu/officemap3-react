import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions/map';
import MapHoverTip from '../components/MapHoverTip';

const mapStateToProps = (state) => {
	return {
		show: !state.hoverLocation.isEmpty(),
		location: state.hoverLocation,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({}, dispatch),
	}
};

const MapHoverTipContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapHoverTip);

export default MapHoverTipContainer;