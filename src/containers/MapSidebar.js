import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../actions/map';
import MapSidebar from '../components/MapSidebar';

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({}, dispatch),
	}
};

const MapSidebarContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapSidebar);

export default MapSidebarContainer;