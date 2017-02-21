import React from 'react';
import { PropTypes } from 'react';
import Immutable from 'immutable';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { ListGroupItem } from 'react-bootstrap';
import '../../styles/sidebar/mapLocationListItem.css';

class MapLocationListItem extends React.Component {
	render = () => {
		if (this.props.location.has('hide') &&
			this.props.location.get('hide') === true
		) {
			return null;
		}

		return (
			<ListGroupItem
				className="map-location-list-item"
				onClick={() => this.props.actions.goToLocation(this.props.location.get('mapElementId'))}
			>
				<span
					className="item-image"
				>
					<img
						src={this.props.location.get('image')}
					    alt={this.props.location.get('name')}
					/>
				</span>
				<span
					className="item-body"
				>
					<div
						className="item-name"
					>
						{this.props.location.get('name')}
					</div>
					<div
						className="item-detail"
					>
						{this.props.location.get('info')}
					</div>
				</span>

			</ListGroupItem>
		);
	}
}

MapLocationListItem.defaultProps = {
	location: Immutable.Map({
		hide: true,
		id: null,
		image: '',
		name: '',
		info: '',
		mapElementId: '',
	}),
};

MapLocationListItem.propTypes = {
	actions: PropTypes.shape({
		goToLocation: PropTypes.func.isRequired,
	}),
};

export default MapLocationListItem;

