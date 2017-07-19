import React from 'react';
import { PropTypes } from 'prop-types';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/map.css';
import MapBox from '../mapBox/MapBoxContainer';
import MapSidebar from '../sidebar/MapSidebarContainer';
import ImageSelector from '../controls/ImageSelectorContainer';

class Map extends React.Component {

	render = () => {
		return (
			<div
				className="map"
			    style={{
				    display: 'flex',
				    flexFlow: 'row nowrap',
				    height: '100%',
				    width: '100%',
			    }}
			>
				<MapSidebar/>
				<MapBox />
				<ImageSelector />
			</div>
		);
	}
}

Map.defaultProps = {

};

Map.propTypes = {
	actions: PropTypes.shape({

	}).isRequired,
};

export default Map;

