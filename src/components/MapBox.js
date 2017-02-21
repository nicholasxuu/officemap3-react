import React from 'react';
import { PropTypes } from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../styles/mapBox.css';
import SvgBox from '../containers/svgMap/SvgBox';
import MapHoverTip from '../containers/svgMap/MapHoverTip';
import MapLocationDetail from '../containers/svgMap/MapDetailWidget';

class MapBox extends React.Component {

	render = () => {
		// return (
		// 	<div className="map-box">
		// 		<SvgBox />
		// 		<MapHoverTip />
		// 		<MapLocationDetail />
		// 	</div>
		// );

		return (
			<div className="map-box">
				<SvgBox />
				<MapHoverTip />
			</div>
		);
	}
}

MapBox.propTypes = {
	actions: PropTypes.shape({

	}),
};

export default MapBox;

