import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showWidgetData, showHoverData } from '../../actions/map';
import SvgBox from '../../components/svgMap/SvgBox';

const mapStateToProps = (state) => {
	return {
		// locations: state.locations,
		// imageData: state.imageData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// actions: bindActionCreators({ showWidgetData, showHoverData }, dispatch),
		actions: bindActionCreators({}, dispatch),
	}
};

const SvgBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SvgBox);

export default SvgBoxContainer;