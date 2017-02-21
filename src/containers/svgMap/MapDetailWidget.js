import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../../actions/map';
import MapDetailWidget from '../../components/svgMap/MapDetailWidget';

const mapStateToProps = (state) => {
	let show = false;
	if (!state.widgetData.get('location').isEmpty()) {
		show = true;
	}

	return {
		show: show,
		pagePosX: state.widgetData.get('pagePosX'),
		pagePosY: state.widgetData.get('pagePosY'),
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