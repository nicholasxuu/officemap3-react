import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showHoverData, showWidgetData } from '../actions/map';
import MapBox from '../components/MapBox';

const mapStateToProps = (state) => {
	return {
		// locations: state.locations,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// actions: bindActionCreators({showHoverData, showWidgetData}, dispatch),
		actions: bindActionCreators({}, dispatch),
	}
};

const MapBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(MapBox);

export default MapBoxContainer;