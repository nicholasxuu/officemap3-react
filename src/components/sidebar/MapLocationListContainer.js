import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../../actions/map';
import MapLocationList from './MapLocationList';

const mapStateToProps = (state) => {
	return {
		locations: state.locations,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({}, dispatch),
	}
};

const MapLocationListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapLocationList);

export default MapLocationListContainer;