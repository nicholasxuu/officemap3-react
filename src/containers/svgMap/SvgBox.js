import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showWidgetData, showHoverData, svgPan, svgZoom, centerAtPoint } from '../../actions/map';
import SvgBox from '../../components/svgMap/SvgBox';

const mapStateToProps = (state) => {
	const tMatrix = [1, 0, 0, 1, 0, 0];
	return {
		// locations: state.locations,
		imageData: state.imageData,
		// transformMatrix: tMatrix,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			// showWidgetData,
			// showHoverData,
			svgPan,
			svgZoom,
			centerAtPoint
		}, dispatch),
	}
};

const SvgBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SvgBox);

export default SvgBoxContainer;