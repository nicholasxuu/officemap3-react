import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showHoverData, hideHoverData, svgPan, svgZoom, centerAtPoint, goToLocation, setViewportMatrix } from '../../actions/map';
import SvgBox from '../../components/svgMap/SvgBox';
import { getTransformMatrix } from '../../utils/svgUtils';

const mapStateToProps = (state) => {
	const svgOffsetX = state.mapView.getIn(['svgOffset', 'x']);
	const svgOffsetY = state.mapView.getIn(['svgOffset', 'y']);
	const svgZoomScale = state.mapView.getIn(['zoomScale']);
	const imageWidth = state.imageData.get('width');
	const imageHeight = state.imageData.get('height');

	const transformMatrix = getTransformMatrix(svgOffsetX, svgOffsetY, svgZoomScale, imageWidth, imageHeight);

	return {
		imageData: state.imageData,
		transformMatrix
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			showHoverData,
			hideHoverData,
			svgPan,
			svgZoom,
			centerAtPoint,
			goToLocation,
			setViewportMatrix
		}, dispatch),
	}
};

const SvgBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SvgBox);

export default SvgBoxContainer;