import React from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { ListGroup } from 'react-bootstrap';
import '../../styles/sidebar/mapLocationList.css';
import MapLocationListItem from '../../containers/sidebar/MapLocationListItem';

class MapLocationList extends React.Component {

	render = () => {
		return (
			<ListGroup
				className="map-location-list"
			>
				{this.props.locations.map(location =>
					<MapLocationListItem
						key={location.get('id')}
					    location={location}
					/>
				)}
			</ListGroup>
		);
	}
}

MapLocationList.propTypes = {
};

export default MapLocationList;

