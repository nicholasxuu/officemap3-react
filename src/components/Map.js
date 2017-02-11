import React from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../styles/map.css';
import MapBox from '../containers/MapBox';
import MapSidebar from '../containers/MapSidebar';

class Map extends React.Component {

	render = () => {
		return (
			<div className="map">
				<MapSidebar
					locations={this.props.locations}
				/>
				<MapBox />
			</div>
		);
	}
}

Map.propTypes = {
// 	actions: PropTypes.shape({
//
// 	}).isRequired,
// 	locations: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
// 		id: PropTypes.number.isRequired,
// 	})).isRequired,
};

export default Map;

