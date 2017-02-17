import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../../actions/map';
import MapDetailWidget from '../../components/svgMap/MapDetailWidget';

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({}, dispatch),
	}
};

const MapWidgetDetailReducer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapDetailWidget);

export default MapWidgetDetailReducer;