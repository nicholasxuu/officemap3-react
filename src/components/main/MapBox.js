import React from 'react';
import { PropTypes } from 'prop-types';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/mapBox.css';
import SvgBox from '../svgMap/SvgBoxContainer';
import MapHoverTip from '../widgets/MapHoverTipContainer';
import MapDetailWidget from '../widgets/MapDetailWidgetContainer';

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

