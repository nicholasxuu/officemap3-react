import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchLocation } from '../../actions/sidebar';
import MapSearchBox from '../../components/sidebar/MapSearchBox';

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ searchLocation }, dispatch),
	}
};

const MapSearchBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapSearchBox);

export default MapSearchBoxContainer;