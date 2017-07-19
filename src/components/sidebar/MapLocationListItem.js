import React from 'react';
import { PropTypes } from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ListGroupItem } from 'react-bootstrap';
import '../../styles/sidebar/mapLocationListItem.css';

const imageWidth = 51;
const innerHeight = 51;
const outerHeight = innerHeight + 2; // add border

class MapLocationListItem extends React.Component {



	renderImage = () => {
		if (!this.props.locationObj.get('image')) {
			return null;
		}

		return (<img
			src={this.props.locationObj.get('image')}
			alt={this.props.locationObj.get('name')}
			style={{
				height: innerHeight,
				width: imageWidth,
				objectFit: 'cover',
				objectPosition: 'center',
			}}
		/>);
	};

	render = () => {
		if (this.props.locationObj.has('filterHide')) {
			if (this.props.locationObj.get('filterHide') === true) {
				return null;
			}
		} else if (this.props.locationObj.has('hide') &&
			this.props.locationObj.get('hide') === true
		) {
			return null;
		}

		if (!this.props.locationObj.get('name')) {
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
				onClick={() => this.props.actions.goToLocation(this.props.locationObj.get('mapElementId'), true)}
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
						{this.props.locationObj.get('name')}
					</div>
					<div
						className="item-detail"
					>
						{this.props.locationObj.get('brief')}
					</div>
				</span>

			</ListGroupItem>
		);
	}
}

MapLocationListItem.defaultProps = {
	locationObj: Immutable.Map({
		hide: false,
		id: null,
		image: '',
		name: '',
		info: '',
		mapElementId: '',
	}),
};

MapLocationListItem.propTypes = {
	locationObj: ImmutablePropTypes.contains({
		hide: PropTypes.bool.isRequired,
		filterHide: PropTypes.bool,
		id: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		info: PropTypes.string,
		mapElementId: PropTypes.string.isRequired,
	}).isRequired,
	actions: PropTypes.shape({
		goToLocation: PropTypes.func.isRequired,
	}),
};

export default MapLocationListItem;

