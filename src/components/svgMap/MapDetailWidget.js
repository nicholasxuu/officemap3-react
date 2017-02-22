import React from 'react';
import { PropTypes } from 'react';
import Immutable from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/svgMap/mapDetailWidget.css';
import { Popover } from 'react-bootstrap';

const WIDGET_HEIGHT = 150;
const WIDGET_WIDTH = 300;
const WIDGET_TITLE_HEIGHT = 36;

class MapDetailWidget extends React.Component {

	render = () => {
		if (this.props.show === false) {
			return null;
		}

		return (
			<Popover
				id="map-detail-widget"
				className="map-detail-widget"
				placement="top"
				positionLeft={this.props.pagePosX - (WIDGET_WIDTH / 2)}
				positionTop={this.props.pagePosY - WIDGET_HEIGHT}
				title={this.props.location.get('name')}
			    style={{
				    width: WIDGET_WIDTH,
				    maxWidth: WIDGET_WIDTH,
				    height: WIDGET_HEIGHT,
				    maxHeight: WIDGET_HEIGHT,
			    }}
			>
				<div className="widget-container" style={{
					maxHeight: WIDGET_HEIGHT - WIDGET_TITLE_HEIGHT,
				}}>
					<div className="widget-image-container">
						<img
							className="widget-image"
							src={this.props.location.get('image')}
						    alt={this.props.location.get('name')}
						/>
					</div>
					<div className="widget-detail">
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

