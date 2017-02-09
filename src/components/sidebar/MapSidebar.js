import React, {PropTypes} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/sidebar/mapSidebar.css';
import MapSearchBox from '../../containers/sidebar/MapSearchBox';
import MapLocationList from '../../containers/sidebar/MapLocationList';

class MapSidebar extends React.Component {

	render = () => {
		return (
			<div className="map-sidebar">
				<MapSearchBox/>
				<MapLocationList/>
			</div>
		);
	}
}

MapSidebar.propTypes = {
};

export default MapSidebar;

