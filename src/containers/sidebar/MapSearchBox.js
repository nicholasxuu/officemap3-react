import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {} from '../../actions/map';
import MapSearchBox from '../../components/sidebar/MapSearchBox';

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({}, dispatch),
	}
};

const MapSearchBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapSearchBox);

export default MapSearchBoxContainer;