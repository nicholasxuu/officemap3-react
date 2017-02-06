import React, {PropTypes} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import MapSearchBox from './MapSearchBox';
import MapLocationList from './MapLocationList';

class MapSidebar extends React.Component {

	render = () => {
		return (
			<div>
				MapSidebar
				<MapSearchBox
					locations={this.props.locations}
				/>
				<MapLocationList
					locations={this.props.locations}
				/>
			</div>
		);
	}
}

// MapSidebar.propTypes = {
// 	actions: PropTypes.shape({}).isRequired,
// 	locations: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
// 		name: PropTypes.string.isRequired,
// 	})).isRequired,
// };

export default MapSidebar;

