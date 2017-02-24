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
				style={{
					display: 'flex',
					flexFlow: 'row nowrap',
					width: '100%',
					padding: 0,
					height: '53px', /* 51px inside border */
					minHeight: '53px',
				}}
				onClick={() => this.props.actions.goToLocation(this.props.location.get('mapElementId'), true)}
			>
				<span
					className="item-image"
				>
					<img
						src={this.props.location.get('image')}
					    alt={this.props.location.get('name')}
					    style={{
						    height: '51px',
						    width: '51px',
					    }}
					/>
				</span>
				<span
					className="item-body"
				    style={{
					    display: 'flex',
					    flexFlow: 'column nowrap',
					    justifyContent: 'space-between',
					    padding: '7px 7px',
					    height: '51px',
					    width: '100%',
				    }}
				>
					<div
						className="item-name"
					    style={{
						    fontSize: '16px',
						    fontFamily: 'inherit',
						    fontWeight: 500,
						    lineHeight: 1.1,
						    color: 'inherit',
					    }}
					>
						{this.props.location.get('name')}
					</div>
					<div
						className="item-detail"
					>
						{this.props.location.get('description')}
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

