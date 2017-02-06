import React, { PropTypes } from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import MapBox from './MapBox';
import MapSidebar from './sidebar/MapSidebar';
import MapHoverTip from './MapHoverTip';
import MapLocationDetail from './MapLocationDetail';

class Map extends React.Component {

	render = () => {
		return (
			<div>
				Map
				<MapSidebar
					locations={this.props.locations}
				/>
				<MapBox

				/>
				<MapHoverTip />
				<MapLocationDetail />
			</div>
		);
	}
}

// Map.propTypes = {
// 	actions: PropTypes.shape({
//
// 	}).isRequired,
// 	locations: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
// 		id: PropTypes.number.isRequired,
// 	})).isRequired,
// };

export default Map;

