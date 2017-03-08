import React from 'react';
import { PropTypes } from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../styles/mapBox.css';
import SvgBox from '../containers/svgMap/SvgBox';
import MapHoverTip from '../containers/widgets/MapHoverTip';
import MapDetailWidget from '../containers/widgets/MapDetailWidget';

class MapBox extends React.Component {

	render = () => {

		return (
			<div
				className="map-box"
			    style={{
				    height: '100%',
				    width: '100%',
				    backgroundColor: '#ffffff',
				    overflow: 'hidden',
				    position: 'relative',
			    }}
			>
				<SvgBox />
				<MapHoverTip />
				<MapDetailWidget />
			</div>
		);
	}
}

MapBox.propTypes = {
	actions: PropTypes.shape({

	}),
};

export default MapBox;

