import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showWidgetData, showHoverData, svgPan, svgZoom, centerAtPoint } from '../../actions/map';
import SvgBox from '../../components/svgMap/SvgBox';

const mapStateToProps = (state) => {
	const tMatrix = [1, 0, 0, 1, 0, 0];

	// pan
	tMatrix[4] = state.mapView.getIn(['panSvgDistance', 'x']);
	tMatrix[5] = state.mapView.getIn(['panSvgDistance', 'y']);

	// zoom
	const zoomScale = state.mapView.getIn(['zoomScale']);
	for (let i = 0; i < tMatrix.length; i++) {
		tMatrix[i] *= zoomScale;
	}
	// zoom from center of viewbox (viewBox height/width === image height/width)
	tMatrix[4] += (1 - zoomScale) * state.imageData.get('width') / 2;
	tMatrix[5] += (1 - zoomScale) * state.imageData.get('height') / 2;

	return {
		imageData: state.imageData,
		transformMatrix: tMatrix,
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