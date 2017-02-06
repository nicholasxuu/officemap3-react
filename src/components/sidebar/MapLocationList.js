import React, { PropTypes } from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import MapLocationListItem from './MapLocationListItem';

class MapLocationList extends React.Component {

	render = () => {
		return (
			<div>
				MapLocationList
				{this.props.locations.map(location =>
					<MapLocationListItem
						key={location.get('id')}
						id={location.get('id')}
						name={location.get('name')}
					/>
				)}
			</div>
		);
	}
}

// MapLocationList.propTypes = {
// 	actions: PropTypes.shape({}).isRequired,
// 	locations: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
// 		name: PropTypes.string.isRequired,
// 	})).isRequired,
// };

export default MapLocationList;

