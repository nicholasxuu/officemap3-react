import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goToLocation } from '../../actions/map';
import MapLocationListItem from './MapLocationListItem';

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ goToLocation }, dispatch),
	}
};

const MapLocationListItemContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapLocationListItem);

export default MapLocationListItemContainer;