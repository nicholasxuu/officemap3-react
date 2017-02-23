import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../../actions/map';
import MapDetailWidget from '../../components/svgMap/MapDetailWidget';
import { getTransformMatrix, matrixMultiply, svgPosToPagePos } from '../../utils/svgUtils';

const mapStateToProps = (state) => {
	// check if we should show the object or not.
	let show = false;
	if (!state.widgetData.get('location').isEmpty()) {
		show = true;
	}

	// if show, check where in the page we should position the object
	let pagePos = {x: 0, y: 0};
	if (show === true) {
		// get final matrix
		const svgOffsetX = state.mapView.getIn(['svgOffset', 'x']);
		const svgOffsetY = state.mapView.getIn(['svgOffset', 'y']);
		const svgZoomScale = state.mapView.getIn(['zoomScale']);
		const imageWidth = state.imageDataList.get(0).get('width');
		const imageHeight = state.imageDataList.get(0).get('height');

		const transformMatrix = getTransformMatrix(svgOffsetX, svgOffsetY, svgZoomScale, imageWidth, imageHeight);

		// todo: viewport matrix can still be out of date, may need to read & update viewport matrix here instead.
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
		location: state.widgetData.get('location'),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({}, dispatch),
	}
};

const MapDetailWidgetContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapDetailWidget);

export default MapDetailWidgetContainer;