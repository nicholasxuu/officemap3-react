import React from 'react';
import { PropTypes } from 'react';
import Immutable from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/svgMap/mapDetailWidget.css';
import { Popover } from 'react-bootstrap';

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
				positionLeft={this.props.pagePosX - 150}
				positionTop={this.props.pagePosY - 150 - 10}
				title={this.props.location.get('name')}
			>
				And here's some <strong>amazing</strong> content. It's very engaging. right?
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

