import React from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { ListGroupItem } from 'react-bootstrap';
import '../../styles/sidebar/mapLocationListItem.css';

class MapLocationListItem extends React.Component {
	render = () => {
		return (
			<ListGroupItem
				className="map-location-list-item"
				onClick={() => this.props.actions.selectLocation(this.props.location)}
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

MapLocationListItem.propTypes = {
};

export default MapLocationListItem;

