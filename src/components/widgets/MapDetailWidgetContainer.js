import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import {} from '../../actions/map';
import MapDetailWidget from './MapDetailWidget';
import { getTransformMatrix, matrixMultiply, svgPosToPagePos } from '../../utils/svgUtils';

const mapStateToProps = (state) => {
	// check if we should show the object or not.
	let show = false;
	if (!state.widgetData.get('locationObj').isEmpty()) {
		show = true;
	}

	// if show, check where in the page we should position the object
	let pagePos = {x: 0, y: 0};
	if (show === true) {
		const activeImageId = state.mapView.get('activeImageId');
		// get final matrix
		const svgOffsetX = state.mapView.getIn(['svgOffset', 'x']);
		const svgOffsetY = state.mapView.getIn(['svgOffset', 'y']);
		const svgZoomScale = state.mapView.getIn(['zoomScale']);
		const imageWidth = state.imageDataCollection.get(activeImageId).get('width');
		const imageHeight = state.imageDataCollection.get(activeImageId).get('height');

		const transformMatrix = getTransformMatrix(svgOffsetX, svgOffsetY, svgZoomScale, imageWidth, imageHeight);

		// i.e. user resized window, but never pan/zoom yet.
		const viewportMatrix = state.mapView.get('viewportMatrix');

		const finalMatrix = matrixMultiply(viewportMatrix, transformMatrix);

		const svgPos = {
			x: state.widgetData.getIn(['svgPos', 'x']),
			y: state.widgetData.getIn(['svgPos', 'y']),
		};
		pagePos = svgPosToPagePos(svgPos, finalMatrix);
	}

	return {
		show: show,
		pagePosX: pagePos.x,
		pagePosY: pagePos.y,
		locationObj: state.widgetData.get('locationObj'),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({}, dispatch),
	}
};

const MapDetailWidgetContainer = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(MapDetailWidget));

export default MapDetailWidgetContainer;