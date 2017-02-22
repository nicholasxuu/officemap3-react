import React from 'react';
import { PropTypes } from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import '../../styles/svgMap/mapHoverTip.css';
import { Tooltip } from 'react-bootstrap';

const HOVERTIP_WIDTH = 150;
const HOVERTIP_HEIGHT = 33;

class MapHoverTip extends React.Component {

	render = () => {
		if (this.props.show === false) {
			return null;
		}
		return (
			<Tooltip
				id="map-hover-tooltip"
				className="in map-hover-tip"
				placement="top"
			    style={{
			    	left: this.props.clientPosX - HOVERTIP_WIDTH / 2,
				    top: this.props.clientPosY - HOVERTIP_HEIGHT,
				    height: HOVERTIP_HEIGHT,
				    width: HOVERTIP_WIDTH,
				    maxWidth: HOVERTIP_WIDTH,
			    }}
			>
					{this.props.location.get('name')}
			</Tooltip>
		);
	}
}

MapHoverTip.defaultProps = {
	show: false,
	clientPosX: 0,
	clientPosY: 0,
	location: Immutable.Map({
		id: 0,
		name: 'dummy',
	}),
};

MapHoverTip.propTypes = {
	show: PropTypes.bool.isRequired,
	clientPosX: PropTypes.number.isRequired,
	clientPosY: PropTypes.number.isRequired,
	location: ImmutablePropTypes.contains({
		id: PropTypes.number,
		name: PropTypes.string,
	}).isRequired,
};

export default MapHoverTip;

