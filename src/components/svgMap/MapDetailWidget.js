import React from 'react';
import { PropTypes } from 'react';
import Immutable from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/svgMap/mapDetailWidget.css';

class MapDetailWidget extends React.Component {

	render = () => {
		if (this.props.show === false) {
			return null;
		}

		return (
			<div
				className="map-detail-widget"
				style={{
					left: this.props.pagePosX + 'px',
					top: this.props.pagePosY + 'px',
				}}
			>
				<div

				>
					{this.props.location.get('id')} - {this.props.location.get('name')}
				</div>
			</div>
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

