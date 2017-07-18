import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { showHoverData, hideHoverData, svgPan, svgZoom, centerAtPoint, goToLocation, setViewportMatrix, hideDetailWidget } from '../../actions/map';
import CanvasBox from './CanvasBox';

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({}, dispatch),
	}
};

const CanvasBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CanvasBox);

export default CanvasBoxContainer;