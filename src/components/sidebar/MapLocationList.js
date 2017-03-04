import React from 'react';
import { PropTypes } from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import { ListGroup } from 'react-bootstrap';
import '../../styles/sidebar/mapLocationList.css';
import MapLocationListItem from '../../containers/sidebar/MapLocationListItem';

class MapLocationList extends React.Component {

	render = () => {
		return (
			<ListGroup
				className="map-location-list"
			    style={{
				    display: 'flex',
				    flexFlow: 'column nowrap',
				    width: '100%',
				    height: 'auto',
			    }}
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

MapLocationList.defaultProps = {
	locations: Immutable.List([]),
};

MapLocationList.propTypes = {
	locations: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
		id: PropTypes.number.isRequired,
	})).isRequired,
};

export default MapLocationList;

