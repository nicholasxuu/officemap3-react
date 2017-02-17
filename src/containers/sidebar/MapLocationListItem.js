import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showWidgetData } from '../../actions/map';
import MapLocationListItem from '../../components/sidebar/MapLocationListItem';

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ showWidgetData }, dispatch),
	}
};

const MapLocationListItemContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapLocationListItem);

export default MapLocationListItemContainer;