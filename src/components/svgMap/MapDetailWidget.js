import React from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/svgMap/mapLocationDetail.css';

class MapDetailWidget extends React.Component {

	render = () => {
		return (
			<div
				className="map-location-detail"
			>
				<div
					style={{
						position: 'absolute',
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

MapDetailWidget.propTypes = {
// 	actions: PropTypes.shape({}).isRequired,
};

export default MapDetailWidget;

