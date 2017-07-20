import React from 'react';
import { PropTypes } from 'prop-types';
import Immutable from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/widgets/mapDetailWidget.css';
import { Popover } from 'react-bootstrap';
import MeetingRoomWidget from "../widgetBody/MeetingRoomWidget";
import WorkspaceWidget from "../widgetBody/WorkspaceWidget";

class MapDetailWidget extends React.Component {

	renderImage = () => {
		if (!this.props.locationObj.get('image')) {
			return null;
		}

		return (
			<div className="widget-image-container">
				<img
					className="widget-image"
					src={this.props.locationObj.get('image')}
					alt={this.props.locationObj.get('name')}
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

	renderWidgetBody = () => {
		if (this.props.locationObj.get('detail') &&
			this.props.locationObj.get('category')
		) {
			const locationCategory = this.props.locationObj.get('category');
			if (locationCategory === '/meeting_room') {
				return (
					<MeetingRoomWidget
						locationObj={this.props.locationObj}
					/>
				);
			} else if (locationCategory === '/workspace') {
				return (
					<WorkspaceWidget
						locationObj={this.props.locationObj}
					/>
				);
			}
		}


		return (
			<div dangerouslySetInnerHTML={{__html: this.props.locationObj.get('description')}} />
		);
	};

	render = () => {
		// if don't show, don't display
		if (this.props.show === false) {
			return null;
		}

		// if id or name empty, don't display
		if (!this.props.locationObj.has('id') ||
			this.props.locationObj.get('id') === 0 ||
			!this.props.locationObj.has('name') ||
			this.props.locationObj.get('name') === ''
		) {
			return null;
		}

		const imageDom = this.renderImage();

		const detailDom = this.renderWidgetBody();

		console.log(this.props.locationObj.toJS());

		return (
			<Popover
				id="map-detail-widget"
				className="map-detail-widget"
				placement="top"
				positionLeft={this.props.pagePosX}
				positionTop={this.props.pagePosY}
				title={this.props.locationObj.get('name')}
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
						{detailDom}
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
	locationObj: Immutable.Map({
		id: 0,
	}),
};

MapDetailWidget.propTypes = {
	show: PropTypes.bool.isRequired,
	pagePosX: PropTypes.number.isRequired,
	pagePosY: PropTypes.number.isRequired,
	locationObj: ImmutablePropTypes.contains({
		id: PropTypes.number,
		name: PropTypes.string,
		image: PropTypes.string,
	}).isRequired,
};

export default MapDetailWidget;

