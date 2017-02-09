import React, { PropTypes } from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/sidebar/mapLocationList.css';
import MapLocationListItem from '../../containers/sidebar/MapLocationListItem';

class MapLocationList extends React.Component {

	render = () => {
		return (
			<div className="map-location-list">
				{this.props.locations.map(location =>
					<MapLocationListItem
						key={location.get('id')}
					    location={location}
					/>
				)}
			</div>
		);
	}
}

MapLocationList.propTypes = {
};

export default MapLocationList;

