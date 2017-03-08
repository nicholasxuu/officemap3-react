import React from 'react';
import { PropTypes } from 'react';
import Immutable from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/widgets/mapDetailWidget.css';
import { Popover } from 'react-bootstrap';

class MapDetailWidget extends React.Component {

	renderImage = () => {
		if (!this.props.location.get('image')) {
			return null;
		}

		return (
			<div className="widget-image-container">
				<img
					className="widget-image"
					src={this.props.location.get('image')}
					alt={this.props.location.get('name')}
					style={{
						display: 'block',
						overflow: 'hidden',
						width: '100px',
						maxHeight: '100%',
						objectFit: 'cover',
					}}
				/>
			</div>
		);
	};

	render = () => {
		if (this.props.show === false) {
			return null;
		}

		const imageDom = this.renderImage();

		return (
			<Popover
				id="map-detail-widget"
				className="map-detail-widget"
				placement="top"
				positionLeft={this.props.pagePosX}
				positionTop={this.props.pagePosY}
				title={this.props.location.get('name')}
			    style={{
				    zIndex: 3,
				    /* make widget top and center */
				    transform: 'translateX(-50%) translateY(-100%)',
			    }}
			>
				<div
					className="widget-container"
				    style={{
					    display: 'flex',
					    flexFlow: 'row nowrap',
					    overflow: 'hidden',
					    width: '100%',
					    height: '100%',
				    }}
				>
					{imageDom}
					<div
						className="widget-detail"
					    style={{
						    display: 'block',
						    overflow: 'hidden',
						    width: '200px',
					    }}
					>
						{this.props.location.get('description')}
					</div>
				</div>
			</Popover>
		);
	}
}

MapDetailWidget.defaultProps = {
	show: false,
	pagePosX: 0,
	pagePosY: 0,
	location: Immutable.Map({
		id: 0,
		name: 'dummy',
	}),
};

MapDetailWidget.propTypes = {
	show: PropTypes.bool.isRequired,
	pagePosX: PropTypes.number.isRequired,
	pagePosY: PropTypes.number.isRequired,
	location: ImmutablePropTypes.contains({
		id: PropTypes.number,
		name: PropTypes.string,
	}).isRequired,
};

export default MapDetailWidget;

