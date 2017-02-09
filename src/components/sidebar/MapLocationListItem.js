import React, {PropTypes} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/sidebar/mapLocationListItem.css';

class MapLocationListItem extends React.Component {
	render = () => {
		return (
			<div
				className="map-location-list-item"
				onClick={() => this.props.actions.selectLocation(this.props.location)}
			>
				{this.props.location.get('id')} - {this.props.location.get('name')}
			</div>
		);
	}
}

MapLocationListItem.propTypes = {
};

export default MapLocationListItem;

