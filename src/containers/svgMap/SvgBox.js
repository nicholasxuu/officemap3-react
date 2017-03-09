import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showHoverData, hideHoverData, svgPan, svgZoom, centerAtPoint, goToLocation, setViewportMatrix, hideDetailWidget } from '../../actions/map';
import SvgBox from '../../components/svgMap/SvgBox';
import { getTransformMatrix } from '../../utils/svgUtils';

const mapStateToProps = (state) => {
	const activeImageId = state.mapView.get('activeImageId');

	const svgOffsetX = state.mapView.getIn(['svgOffset', 'x']);
	const svgOffsetY = state.mapView.getIn(['svgOffset', 'y']);
	const svgZoomScale = state.mapView.getIn(['zoomScale']);
	const imageWidth = state.imageDataCollection.get(activeImageId).get('width');
	const imageHeight = state.imageDataCollection.get(activeImageId).get('height');

	const transformMatrix = getTransformMatrix(svgOffsetX, svgOffsetY, svgZoomScale, imageWidth, imageHeight);

	let widgetLocationElementId = null;
	if (!state.widgetData.get('location').isEmpty()) {
		 widgetLocationElementId = state.widgetData.get('location').get('mapElementId');
	}

	return {
		imageData: state.imageDataCollection.get(activeImageId),
		transformMatrix,
		selectedMapElementId: widgetLocationElementId,
		settings: state.settings,
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
			setViewportMatrix,
			hideDetailWidget,
		}, dispatch),
	}
};

const SvgBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SvgBox);

export default SvgBoxContainer;