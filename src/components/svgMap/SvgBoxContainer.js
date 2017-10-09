import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Immutable from 'immutable';
import { showHoverData, hideHoverData, svgPan, svgZoom, centerAtPoint, goToLocation, setViewportMatrix, hideDetailWidget } from '../../actions/map';
import SvgBox from './SvgBox';
import SvgUtils from '../../utils/SvgUtils';

const mapStateToProps = (state) => {
	const activeImageId = state.mapView.get('activeImageId');

	const svgOffsetX = state.mapView.getIn(['svgOffset', 'x']);
	const svgOffsetY = state.mapView.getIn(['svgOffset', 'y']);
	const svgZoomScale = state.mapView.getIn(['zoomScale']);

	let imageWidth = 0;
	let imageHeight = 0;
	let imageData = Immutable.fromJS({
		width: 0,
		height: 0,
		url: '',
		elements: [],
	});
	if (activeImageId) {
		imageWidth = state.imageDataCollection.get(activeImageId).get('width');
		imageHeight = state.imageDataCollection.get(activeImageId).get('height');
		imageData = state.imageDataCollection.get(activeImageId);
	}

	const transformMatrix = SvgUtils.getTransformMatrix(svgOffsetX, svgOffsetY, svgZoomScale, imageWidth, imageHeight);

	let widgetLocationElementId = null;
	if (!state.widgetData.get('locationObj').isEmpty()) {
		 widgetLocationElementId = state.widgetData.get('locationObj').get('mapElementId');
	}

	return {
		imageData,
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

const SvgBoxContainer = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(SvgBox));

export default SvgBoxContainer;