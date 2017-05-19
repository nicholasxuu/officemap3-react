import React from 'react';
import { PropTypes } from 'prop-types';
import Immutable from 'immutable';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { ListGroupItem } from 'react-bootstrap';
import '../../styles/sidebar/mapLocationListItem.css';

const imageWidth = 51;
const innerHeight = 51;
const outerHeight = innerHeight + 2; // add border

class MapLocationListItem extends React.Component {



	renderImage = () => {
		if (!this.props.location.get('image')) {
			return null;
		}

		return (<img
			src={this.props.location.get('image')}
			alt={this.props.location.get('name')}
			style={{
				height: innerHeight,
				width: imageWidth,
				objectFit: 'cover',
				objectPosition: 'center',
			}}
		/>);
	};

	render = () => {
		if (this.props.location.has('hide') &&
			this.props.location.get('hide') === true
		) {
			return null;
		}

		if (!this.props.location.get('name')) {
			return null;
		}

		const imageDom = this.renderImage();

		return (
			<ListGroupItem
				className="map-location-list-item"
				style={{
					display: 'flex',
					flexFlow: 'row nowrap',
					width: '100%',
					padding: 0,
					height: outerHeight,
					minHeight: outerHeight,
				}}
				onClick={() => this.props.actions.goToLocation(this.props.location.get('mapElementId'), true)}
			>
				<span
					className="item-image"
				    style={{
				    	width: imageWidth,
					    minWidth: imageWidth,
					    height: innerHeight,
					    minHeight: innerHeight,
				    }}
				>
					{imageDom}
				</span>
				<span
					className="item-body"
				    style={{
					    display: 'flex',
					    flexFlow: 'column nowrap',
					    justifyContent: 'space-between',
					    padding: '7px 7px',
					    height: innerHeight,
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
						{this.props.location.get('brief')}
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

