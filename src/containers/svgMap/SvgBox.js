import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showHoverData, hideHoverData, svgPan, svgZoom, centerAtPoint, goToLocation, setViewportMatrix, hideDetailWidget } from '../../actions/map';
import SvgBox from '../../components/svgMap/SvgBox';
import { getTransformMatrix } from '../../utils/svgUtils';

const mapStateToProps = (state) => {
	const svgOffsetX = state.mapView.getIn(['svgOffset', 'x']);
	const svgOffsetY = state.mapView.getIn(['svgOffset', 'y']);
	const svgZoomScale = state.mapView.getIn(['zoomScale']);
	const imageWidth = state.imageDataList.get(0).get('width');
	const imageHeight = state.imageDataList.get(0).get('height');

	const transformMatrix = getTransformMatrix(svgOffsetX, svgOffsetY, svgZoomScale, imageWidth, imageHeight);

	let widgetLocationElementId = null;
	if (!state.widgetData.get('location').isEmpty()) {
		 widgetLocationElementId = state.widgetData.get('location').get('mapElementId');
	}

	return {
		imageData: state.imageDataList.get(0),
		transformMatrix,
		selectedMapElementId: widgetLocationElementId,
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