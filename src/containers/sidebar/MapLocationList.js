import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../../actions/map';
import MapLocationList from '../../components/sidebar/MapLocationList';

const mapStateToProps = (state) => {

	if (state.searchText !== '') {
		return {
			locations: state.locations.filter(location => {
				if (
					location.get('name').search(state.searchText) !== -1 ||
					location.get('info').search(state.searchText) !== -1
				) {
					return true;
				}
				return false;
			}),
		};
	}

	return state;
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