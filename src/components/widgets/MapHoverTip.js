import React from 'react';
import { PropTypes } from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import '../../styles/widgets/mapHoverTip.css';
import { Tooltip } from 'react-bootstrap';

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
			    	left: this.props.clientPosX,
				    top: this.props.clientPosY,
				    position: 'fixed',
				    zIndex: 2,
				    /* prevent causing mouseLeave when mouse touch it */
				    pointerEvents: 'none',
				    textAlign: 'center',
				    /* make widget top and center */
				    transform: 'translateX(-50%) translateY(-100%)',
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
