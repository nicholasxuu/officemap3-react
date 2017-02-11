import React from 'react';
import _ from 'underscore';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../styles/mapBox.css';
import SvgBox from '../containers/svgMap/SvgBox';
import MapHoverTip from '../containers/svgMap/MapHoverTip';
import MapLocationDetail from '../containers/svgMap/MapLocationDetail';

class MapBox extends React.Component {

	render = () => {
		return (
			<div className="map-box">
				<SvgBox />
				<MapHoverTip />
				<MapLocationDetail />
			</div>
		);
	}
}

MapBox.propTypes = {
// 	actions: PropTypes.shape({}).isRequired,
};

export default MapBox;

