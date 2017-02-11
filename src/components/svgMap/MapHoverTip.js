import React from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/svgMap/mapHoverTip.css';

class MapHoverTip extends React.Component {

	render = () => {
		return (
			<div
				className="map-hover-tip"
			>
				<div
					style={{
						position: 'fixed', // hovertip follow mouse pointer and use screen coordinates
						top: this.props.posY + 'px',
						left: this.props.posX + 'px',
						display: this.props.show ? 'block': 'none',
					}}
				>
					{this.props.location.get('id')} - {this.props.location.get('name')}
				</div>
			</div>
		);
	}
}

MapHoverTip.propTypes = {
// 	actions: PropTypes.shape({}).isRequired,
// 	posX: PropTypes.number.isRequired,
// 	posY: PropTypes.number.isRequired,
// 	maxWidth: PropTypes.number.isRequired,
// 	maxHeight: PropTypes.number.isRequired,
};

export default MapHoverTip;
