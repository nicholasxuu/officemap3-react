import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectLocation, hoverLocation } from '../../actions/map';
import SvgBox from '../../components/svgMap/SvgBox';

const mapStateToProps = (state) => {
	return {
		locations: state.locations,
		image: state.image,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			selectLocation,
			hoverLocation
		}, dispatch),
	}
};

const SvgBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SvgBox);

export default SvgBoxContainer;